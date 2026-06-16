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

/* 臺羅正規化：去掉調符與調號數字、連字符，全部小寫。
   讓「han」「han2」「hán」「han-tit」都能對上「hán-tit」。 */
function normalizeTailo(text) {
  return (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[0-9]/g, "")
    .replace(/[-\s]/g, "")
    .toLocaleLowerCase();
}

function normalizePlain(text) {
  return (text || "").toLocaleLowerCase();
}

function entryMatches(entry, query) {
  if (!query) return true;
  const plainQuery = normalizePlain(query);
  const occurrenceText = entry.occurrences
    .map((occurrence) => [occurrence.lyric, occurrence.songMeaning].join(" "))
    .join(" ");
  const haystack = normalizePlain([
    entry.term,
    entry.tailo,
    entry.partOfSpeech,
    entry.dictionaryDefinition,
    entry.english,
    entry.interpretation,
    occurrenceText
  ].join(" "));
  if (haystack.includes(plainQuery)) return true;
  const tailoQuery = normalizeTailo(query);
  return tailoQuery.length > 0 && normalizeTailo(entry.tailo).includes(tailoQuery);
}

function createChip(text, href) {
  const chip = document.createElement(href ? "a" : "span");
  chip.className = "source-chip";
  chip.textContent = text;
  if (href) chip.href = href;
  return chip;
}

function renderProgress(data) {
  const note = document.querySelector("#progress-note");
  const songCount = data.works.reduce((sum, work) => sum + (work.collectedSongCount || 0), 0);
  const termCount = data.entries.length;
  note.textContent = `目前收錄 ${songCount} 首歌・${termCount} 個詞，持續整理中`;
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
    const hasContent = work.collectedSongCount > 0;
    action.textContent = hasContent ? "讀〈真罕得想起來〉" : "等待整理";
    if (hasContent) {
      action.addEventListener("click", () => {
        document.querySelector("#words").scrollIntoView({ behavior: "smooth" });
      });
    } else {
      action.disabled = true;
    }
    container.append(fragment);
  });
}

function renderSongHeader(data) {
  const song = data.songs[0];
  const work = data.works.find((item) => item.id === song.workId);
  document.querySelector("#song-eyebrow").textContent = `《${work.title}》· ${work.year}`;
  document.querySelector("#collection-title").textContent = `〈${song.title}〉`;

  const tags = document.querySelector("#song-tags");
  song.languages.forEach((language) => {
    const badge = document.createElement("span");
    badge.className = "badge-lang";
    badge.textContent = language;
    tags.append(badge);
  });
  song.tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = `#${tag}`;
    tags.append(item);
  });
}

function clearSearchSilently() {
  const search = document.querySelector("#search");
  if (search.value) {
    search.value = "";
    search.dispatchEvent(new Event("input"));
  }
}

function focusCard(entryId) {
  clearSearchSilently();
  requestAnimationFrame(() => {
    const card = document.querySelector(`#word-${CSS.escape(entryId)}`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    card.classList.add("is-target");
    setTimeout(() => card.classList.remove("is-target"), 2400);
  });
}

function renderIndex(data) {
  const list = document.querySelector("#index-list");
  const sorted = [...data.entries].sort((a, b) =>
    normalizeTailo(a.tailo).localeCompare(normalizeTailo(b.tailo))
  );
  sorted.forEach((entry) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "index-item";
    const term = document.createElement("span");
    term.lang = "nan-Hant-TW";
    term.textContent = entry.term;
    const tailo = document.createElement("small");
    tailo.lang = "nan-Latn-TW";
    tailo.textContent = entry.tailo;
    item.append(term, tailo);
    item.addEventListener("click", () => focusCard(entry.id));
    list.append(item);
  });
}

function permalinkFor(entryId) {
  return `${location.origin}${location.pathname}#word-${entryId}`;
}

async function copyPermalink(entryId, button) {
  const url = permalinkFor(entryId);
  try {
    await navigator.clipboard.writeText(url);
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = url;
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  const original = button.textContent;
  button.textContent = "已複製";
  setTimeout(() => { button.textContent = original; }, 1600);
}

function renderEntries(data, query = "") {
  const cards = document.querySelector("#cards");
  const template = document.querySelector("#card-template");
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty");

  const entries = data.entries.filter((entry) => entryMatches(entry, query.trim()));
  cards.replaceChildren();

  entries.forEach((entry, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".card");
    card.id = `word-${entry.id}`;

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
      tag.className = "badge-lang";
      tag.textContent = language;
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

    fragment.querySelector(".permalink").addEventListener("click", (event) => {
      copyPermalink(entry.id, event.currentTarget);
    });

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
  const defaultHint = "可搜尋漢字、臺羅（免調符）、華語、英文與歌詞";

  const update = (event) => {
    const query = search.value.trim();
    const count = renderEntries(data, query);
    hint.textContent = query ? `找到 ${count} 張符合「${query}」的詞卡` : defaultHint;
    clear.hidden = !query;
    if (query && event && event.isTrusted) {
      document.querySelector("#words").scrollIntoView({ behavior: "smooth" });
    }
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
  const status = document.querySelector("#report-status");
  const link = document.querySelector("#report-link");
  const { githubRepository, feedbackEmail } = data.project;

  if (githubRepository) {
    link.href = `${githubRepository}/issues/new?template=correction.yml`;
    link.textContent = "回報詞條問題 ↗";
  } else if (feedbackEmail) {
    link.href = `mailto:${feedbackEmail}?subject=${encodeURIComponent("[宜農辭典校訂] ")}`;
    link.textContent = "來信回報詞條問題 ↗";
  } else {
    return;
  }
  link.hidden = false;
  status.hidden = true;
}

function setupAboutLinks(data) {
  const list = document.querySelector("#about-links");
  (data.project.referenceLinks || []).forEach((reference) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.className = "text-link";
    anchor.href = reference.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = `${reference.label} ↗`;
    item.append(anchor);
    list.append(item);
  });
}

function handleDeepLink() {
  const match = location.hash.match(/^#word-(.+)$/);
  if (!match) return;
  focusCard(decodeURIComponent(match[1]));
}

async function init() {
  const data = await loadData();
  if (!data) throw new Error("Dictionary data could not be loaded.");
  renderProgress(data);
  renderWorks(data);
  renderSongHeader(data);
  renderIndex(data);
  renderEntries(data);
  setupSearch(data);
  setupReportLink(data);
  setupAboutLinks(data);
  handleDeepLink();
  window.addEventListener("hashchange", handleDeepLink);
}

init().catch((error) => {
  console.error(error);
  document.querySelector("#cards").textContent = "資料載入失敗，請重新整理頁面。";
});
