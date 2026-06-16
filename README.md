# 宜農辭典：網站原型

直接打開 `index.html` 即可瀏覽。

## 本版內容

- 以《水逆》／《圓缺》／歌仔為入口的作品書架（書架標語為自動計算的收錄進度）
- 鄭宜農〈真罕得想起來〉的 12 張詞語卡
- 辭典義、歌中義、編者的語感筆記三層內容
- 教育部辭典詞條與真人發音入口
- 漢字、臺羅、華語、英文和歌詞全文搜尋；臺羅搜尋支援免調符與調號數字（`han`、`han2` 皆可命中 `hán`）
- 依臺羅排列的詞語索引，供想隨意翻閱的讀者使用
- 每張詞卡有獨立網址（`index.html#word-詞語id`），卡上有「複製連結」按鈕，開啟帶錨點的網址會自動捲動並標亮該卡
- 語言徽章與主題標籤分開呈現；發行型態由書架位置自帶，不另外標示
- 臺語內容標註 `lang="nan-Hant-TW"`、臺羅標註 `lang="nan-Latn-TW"`，利於螢幕報讀器與字型選擇
- 作品、歌曲、語言、校訂狀態與時間戳 metadata
- GitHub 詞條校訂 Issue 模板
- 手機與桌面自適應版面

## 資料結構

`data/site-data.json` 是唯一需要人工維護的正式資料來源：

- `project`：站台資訊與校訂管道設定
- `works`：專輯、單曲或電影歌曲分組
- `songs`：歌曲資料與作品脈絡
- `entries`：詞語本身、辭典資訊與校訂狀態
- `occurrences`：詞語在不同歌曲中的短歌詞與歌中義

同一個詞出現在不同歌曲時，只需在該詞的 `occurrences` 加入用例。

`data/site-data.js` 是為 `file://` 本機預覽生成的備援檔，內容須與 JSON 同步（可用任何 JSON 工具重新產生：`window.YILONG_DICTIONARY_DATA = <json>;`）。網站部署到 GitHub Pages 後會優先讀取 JSON。

## 開通校訂管道

「一起校訂」區塊的入口由資料驅動，二擇一即可上線：

1. 在 `project.githubRepository` 填入公開倉庫網址 → 顯示 Issue 回報入口（使用 `.github/ISSUE_TEMPLATE/correction.yml`）。
2. 在 `project.feedbackEmail` 填入信箱 → 顯示來信回報入口。

兩者皆為 `null` 時，頁面誠實顯示「校訂管道籌備中」。

## 編輯狀態

正式公開前仍應邀請臺語母語者校訂。語感內容均標示為「編者的語感筆記」，不視為作品的唯一解釋。

主要查證入口：教育部《臺灣台語常用詞辭典》
https://sutian.moe.edu.tw/zh-hant/
