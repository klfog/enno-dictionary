const entries = [
  {
    term: "颺颺飛",
    tailo: "iānn-iānn-pue",
    zh: "飛揚、飄揚",
    en: "to drift and flutter in the air",
    category: "聲音與動態",
    group: "sound",
    status: "已確認",
    verified: true,
    lyric: "塵埃颺颺飛",
    usage: "「颺颺」把塵埃的飛寫得細碎而綿長。它不是一下子揚起，而是在昏暗房間裡浮游不定，像那些仍留在空氣中的記憶。",
    echo: "同張專輯的「恬恬仔」「戇戇仔」「漸漸仔」也用重疊延長狀態，讓語句有自己的步伐。",
    echoSource: "〈留佇咱的血內底〉、〈未曾準備好〉",
    structure: "暫以「AA + 動詞」理解。重疊並非臺語獨有，但這個具體形式和音節節奏很有臺語特色；臺羅仍需依實際唱音確認。"
  },
  {
    term: "落落來",
    tailo: "làu-làu-lâi",
    zh: "接連、緩緩地落下來",
    en: "to fall down, one after another",
    category: "聲音與動態",
    group: "sound",
    status: "已確認",
    verified: true,
    lyric: "又閣落落來",
    usage: "前一句還在「颺颺飛」，下一句便「落落來」。飛起與落下反覆交替，塵埃終究回到原處，也像記憶浮現以後又慢慢沉下去。",
    echo: "〈圓缺〉寫「沓沓仔坐落」，同樣用聲音較慢的形式描畫動作逐漸完成。",
    echoSource: "〈圓缺〉",
    structure: "可先拆成「落落 + 來」。「來」是朝向說話者的方向補語；完整重疊規則與連讀音待校訂。"
  },
  {
    term: "伊",
    tailo: "i",
    zh: "他、她、它",
    en: "he, she, or it",
    category: "代詞與語法",
    group: "grammar",
    status: "已初核",
    verified: true,
    lyric: "這馬，伊已經真罕得想起來",
    usage: "「伊」沒有替故事裡的人標上性別，只留下曾經存在的那一個人。這份不指明，使歌詞既私密，又能容納每位聽者自己的記憶。",
    echo: "同專輯〈留佇咱的血內底〉出現「𪜶」，是複數第三人稱「他們」。",
    echoSource: "〈留佇咱的血內底〉",
    structure: "「伊」是教育部推薦用字，讀作 i。它可以依語境指人或物；這張卡保留其不標性別的特點。"
  },
  {
    term: "煞心",
    tailo: "sannh-sim",
    zh: "渴望、盼望",
    en: "to long for; to yearn for",
    category: "感受與狀態",
    group: "feeling",
    status: "已確認",
    verified: true,
    lyric: "煞心，平凡的愛",
    usage: "伊所煞心的不是戲劇性的愛，而是「平凡的愛」。越是普通的願望，在傷害之後反而越遙遠；兩個詞並置，使渴望裡也帶著疼痛。",
    echo: "目前尚未找到可可靠核對的其他作品用例。這張卡刻意保留研究中的空白。",
    echoSource: "待官方歌詞用字、唱音與母語者共同核實",
    structure: "心中有所期盼；心裡受到強烈刺激，而對某人或某物非常想得到。讀作 sannh-sim。"
  },
  {
    term: "仝款",
    tailo: "kāng-khuán",
    zh: "一樣、相同、同樣",
    en: "the same; alike",
    category: "感受與狀態",
    group: "feeling",
    status: "已初核",
    verified: true,
    lyric: "仝款，佮別人仝款",
    usage: "「仝款」在歌裡一再重複，像是不斷說服自己：只想和別人一樣，只想擁有普通的生活。重複愈多，這個願望反而顯得愈難抵達。",
    echo: "「仝」也可獨立表示相同；「款」保留種類、樣式的意思，合起來像「同一款」。",
    echoSource: "教育部推薦用字與臺語構詞",
    structure: "「仝」表示相同，是「同」的古字／異體來源之一；「款」表示種類或樣式。字義疊合後成為「同樣」。"
  },
  {
    term: "佇",
    tailo: "tī",
    zh: "在、於",
    en: "at; in; on",
    category: "代詞與語法",
    group: "grammar",
    status: "已初核",
    verified: true,
    lyric: "佇夢中喝，喝一世人",
    usage: "「佇」把聲音安放在夢裡，也把洗不去的氣味留在身軀。它不只是「在」，還讓抽象的創傷像有了位置，可以長久停駐。",
    echo: "同專輯裡幾乎處處可見：「徛佇邊仔」「坐佇窗仔邊」「留佇咱的血內底」。",
    echoSource: "〈留佇咱的血內底〉、〈未曾準備好〉",
    structure: "教育部資料列「佇 tī」為「在、於」。字本有停留、久立之意，臺語延續了處所用法。"
  },
  {
    term: "真罕得",
    tailo: "tsin hán-tit",
    zh: "很少、難得；已不常",
    en: "rarely; hardly ever",
    category: "感受與狀態",
    group: "feeling",
    status: "已確認",
    verified: true,
    lyric: "這馬，伊已經真罕得想起來",
    usage: "「真罕得」說的不是珍貴的一次想起，而是已經很少再想起。記憶沒有突然消失，只是在時間裡逐漸稀薄；語氣平靜，卻藏著走過很久以後才有的距離。",
    echo: "同專輯用「真」表示程度，例如「嘛真好」「我真歡喜」；它相當於華語的「很」。",
    echoSource: "〈牽我〉、〈圓缺〉",
    structure: "「真」在這裡是程度副詞「很」；「罕得」表示少有、難得。臺羅及「罕得」的正式詞條仍待核對。"
  },
  {
    term: "暗眠摸",
    tailo: "àm-bîn-bong",
    zh: "昏黑、暗得需要摸索",
    en: "pitch-dark; dark enough to grope through",
    category: "感受與狀態",
    group: "feeling",
    status: "已確認",
    verified: true,
    lyric: "暗眠摸的房間",
    usage: "「暗眠摸」不是靜止的黑色，而是一種需要伸手摸索的黑暗。房間看不清，過去也看不清；聽者先感到身體迷失其中，才看見塵埃浮起。",
    echo: "〈又閣減一工〉使用「烏暗」直接表示黑暗；兩者可以並讀，感受「暗眠摸」額外帶出的觸覺。",
    echoSource: "〈又閣減一工〉",
    structure: "讀作 àm-bîn-bong，形容昏暗、黑暗得看不清楚。歌中用來修飾房間。"
  },
  {
    term: "這馬",
    tailo: "tsit-má",
    zh: "現在、此刻",
    en: "now; at this moment",
    status: "已初核",
    verified: true,
    lyric: "這馬，伊已經真罕得想起來",
    usage: "歌從「這馬」開始，把人放在已經走過傷害的此刻。它和後面的「已經」一起拉開時間：往事並未不存在，只是如今很少再被想起。",
    structure: "「這馬」表示現在、此刻，是臺語常見的時間指示詞，讀作 tsit-má。"
  },
  {
    term: "遐爾",
    tailo: "hiah-nī",
    zh: "那麼、如此",
    en: "so; that; to such a degree",
    status: "已初核",
    verified: true,
    lyric: "是啥人的手遐爾大",
    usage: "「遐爾」在接連的問句中一次次把感覺放大：手那麼大、氣味那麼重、聲音那麼響、眼神那麼利。傷害因此不是抽象的，而是從身體感官逼近。",
    structure: "程度副詞，表示「那麼、如此」。歌中反覆接在形容詞前面。"
  },
  {
    term: "一世人",
    tailo: "tsi̍t-sì-lâng",
    zh: "一輩子、一生",
    en: "a lifetime; one's whole life",
    status: "已初核",
    verified: true,
    lyric: "佇夢中喝，喝一世人",
    usage: "「一世人」把夢中的一聲呼喊延長成整個生命。它不再只是一場惡夢，而像某個聲音一直留在身體裡，醒來以後也沒有真正停止。",
    structure: "由「一世」與「人」組成，指一個人的一生、一輩子。"
  },
  {
    term: "喙掩",
    tailo: "tshuì-am",
    zh: "摀住嘴巴；掩嘴的手",
    en: "to cover someone's mouth; a hand over the mouth",
    status: "已初核",
    verified: true,
    lyric: "變做拳頭，變做喙掩",
    usage: "同一雙手先「變做拳頭」，再「變做喙掩」：它既能造成傷害，也能阻止受傷的人發出聲音。兩個動作並列，使暴力和沉默成為同一件事。",
    structure: "「喙」是嘴巴，讀 tshuì；「掩」有遮蓋、摀住之意。此處指摀住嘴巴的動作或那隻手。"
  }
];

const cards = document.querySelector("#cards");
const template = document.querySelector("#card-template");
const search = document.querySelector("#search");
const clearSearch = document.querySelector("#clear-search");
const searchHint = document.querySelector("#search-hint");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty");

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = entries.filter((entry) => {
    const haystack = [
      entry.term, entry.tailo, entry.zh, entry.en, entry.lyric,
      entry.usage
    ].join(" ").toLocaleLowerCase();
    return haystack.includes(query);
  });

  cards.replaceChildren();

  visible.forEach((entry, index) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".card");
    const status = fragment.querySelector(".status");
    status.textContent = entry.status;
    if (entry.verified) status.classList.add("verified");
    fragment.querySelector(".term").textContent = entry.term;
    fragment.querySelector(".tailo").textContent = entry.tailo;
    fragment.querySelector(".number").textContent = String(index + 1).padStart(2, "0");
    fragment.querySelector(".zh").textContent = entry.zh;
    fragment.querySelector(".en").textContent = entry.en;
    fragment.querySelector(".lyric").textContent = entry.lyric;
    fragment.querySelector(".usage").textContent = entry.usage;
    cards.append(fragment);
  });

  count.textContent = `${visible.length} 張詞語卡片`;
  searchHint.textContent = query
    ? `找到 ${visible.length} 張符合「${search.value.trim()}」的詞卡`
    : "輸入時會立即篩選詞卡";
  clearSearch.hidden = query.length === 0;
  empty.hidden = visible.length !== 0;
}

search.addEventListener("input", render);
search.addEventListener("search", render);
clearSearch.addEventListener("click", () => {
  search.value = "";
  search.focus();
  render();
});

document.querySelector("[data-scroll-to]").addEventListener("click", () => {
  document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
});

render();
