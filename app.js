const fallbackData = window.YILONG_DICTIONARY_DATA;

async function loadData() {
  if (location.protocol !== "file:") {
    try {
      const response = await fetch("data/site-data.json");
      if (response.ok) return await response.json();
    } catch (error) {
      console.warn("JSON data unavailable; using local preview fallback.", error);
    }
  }
  return fallbackData;
}

function createChip(text, href) {
  const chip = document.createElement(href ? "a" : "span");
  chip.className = "source-chip";
  chip.textContent = text;
  if (href) chip.href = href;
  return chip;
}

function renderWorks(data) {
  const container = document.querySelector("#work-shelves");
  const template = document.querySelector("#work-template");

  data.works.forEach((work) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".work-card");
    card.dataset.theme = work.theme;
    fragment.querySelector(".work-year").textContent = work.year || "跨年份";
    fragment.querySelector(".work-state").textContent = work.state;
    fragment.querySelector(".work-title").textContent = work.title;
    fragment.querySelector(".work-description").textContent = work.description;

    const counts = fragment.querySelector(".work-counts");
    counts.append(
      document.createTextNode(`${work.collectedSongCount} 首已整理`),
      document.createTextNode(`${work.termCount} 張詞卡`)
    );

    const action = fragment.querySelector(".work-action");
    action.textContent = work.id === "moon-phases" ? "讀〈真罕得想起來〉" : "等待整理";
    if (work.id === "moon-phases") {
      action.addEventListener("click", () => {
        document.querySelector("#words").scrollIntoView({ behavior: "smooth" });
      });
    } else {
      action.disabled = true;
    }
    container.append(fragment);
  });
}

function renderEntries(data, query = "") {
  const cards = document.querySelector("#cards");
  const template = document.querySelector("#card-template");
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty");
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const entries = data.entries.filter((entry) => {
    const occurrenceText = entry.occurrences
      .map((occurrence) => [occurrence.lyric, occurrence.songMeaning].join(" "))
      .join(" ");
    const haystack = [
      entry.term,
      entry.tailo,
      entry.partOfSpeech,
      entry.dictionaryDefinition,
      entry.english,
      entry.interpretation,
      occurrenceText
    ].join(" ").toLocaleLowerCase();
    return haystack.includes(normalizedQuery);
  });

  cards.replaceChildren();

  entries.forEach((entry, index) => {
    const fragment = template.content.cloneNode(true);
    const status = fragment.querySelector(".status");
    const occurrence = entry.occurrences[0];
    const song = data.songs.find((item) => item.id === occurrence.songId);
    const work = data.works.find((item) => item.id === song.workId);

    status.textContent = entry.reviewStatus;
    if (entry.reviewStatus === "已確認" || entry.reviewStatus === "已初核") {
      status.classList.add("verified");
    }

    const languageTags = fragment.querySelector(".language-tags");
    entry.languages.forEach((language) => {
      const tag = document.createElement("span");
      tag.textContent = `#${language}`;
      languageTags.append(tag);
    });

    fragment.querySelector(".term").textContent = entry.term;
    fragment.querySelector(".tailo").textContent = entry.tailo;
    fragment.querySelector(".part-of-speech").textContent = entry.partOfSpeech;
    fragment.querySelector(".number").textContent = String(index + 1).padStart(2, "0");
    fragment.querySelector(".dictionary-definition").textContent = entry.dictionaryDefinition;
    fragment.querySelector(".english").textContent = entry.english;

    const dictionaryLink = fragment.querySelector(".dictionary-link");
    dictionaryLink.href = entry.dictionary.url;
    if (entry.dictionary.match === "search") {
      dictionaryLink.textContent = "教育部辭典搜尋・找發音 ↗";
    } else if (entry.dictionary.match === "component") {
      dictionaryLink.textContent = "教育部辭典查相關詞・聽發音 ↗";
    }

    fragment.querySelector(".lyric").textContent = occurrence.lyric;
    fragment.querySelector(".lyric-source").textContent = `鄭宜農〈${song.title}〉`;
    fragment.querySelector(".song-meaning p").textContent = occurrence.songMeaning;
    fragment.querySelector(".interpretation p").textContent = entry.interpretation;

    const chips = fragment.querySelector(".source-chips");
    chips.append(
      createChip(`〈${song.title}〉`, "#words"),
      createChip(`《${work.title}》`, "#works")
    );
    entry.languages.forEach((language) => chips.append(createChip(`#${language}`)));

    const updated = fragment.querySelector(".updated-at");
    updated.dateTime = entry.updatedAt;
    updated.textContent = `更新 ${entry.updatedAt}`;
    cards.append(fragment);
  });

  count.textContent = `${entries.length} 張詞語卡片`;
  empty.hidden = entries.length !== 0;
  return entries.length;
}

function setupSearch(data) {
  const search = document.querySelector("#search");
  const clear = document.querySelector("#clear-search");
  const hint = document.querySelector("#search-hint");

  const update = () => {
    const query = search.value.trim();
    const count = renderEntries(data, query);
    hint.textContent = query
      ? `找到 ${count} 張符合「${query}」的詞卡`
      : "可搜尋漢字、臺羅、華語、英文與歌詞";
    clear.hidden = !query;
    if (query) document.querySelector("#words").scrollIntoView({ behavior: "smooth" });
  };

  search.addEventListener("input", update);
  search.addEventListener("search", update);
  clear.addEventListener("click", () => {
    search.value = "";
    search.focus();
    update();
  });
}

function setupReportLink(data) {
  if (!data.project.githubRepository) return;
  const status = document.querySelector("#report-status");
  const link = document.querySelector("#report-link");
  link.href = `${data.project.githubRepository}/issues/new?template=correction.yml`;
  link.hidden = false;
  status.hidden = true;
}

async function init() {
  const data = await loadData();
  if (!data) throw new Error("Dictionary data could not be loaded.");
  renderWorks(data);
  renderEntries(data);
  setupSearch(data);
  setupReportLink(data);
}

init().catch((error) => {
  console.error(error);
  document.querySelector("#cards").textContent = "資料載入失敗，請重新整理頁面。";
});
