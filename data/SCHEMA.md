# 資料欄位

## works

- `id`：穩定識別碼
- `title`：作品名稱
- `year`：年份
- `type`：`album` 或 `singles-and-soundtracks`
- `theme`：視覺主題
- `state`：整理狀態
- `description`：作品脈絡
- `collectedSongCount`：已整理歌曲數
- `termCount`：詞卡數

## project

- `githubRepository`：公開倉庫網址；填入後網站會自動啟用校訂 Issue 入口

## songs

- `id`：穩定識別碼
- `title`：歌名
- `workId`：所屬作品
- `trackNumber`：曲序
- `languages`：語言標籤
- `context`：專輯曲、合作單曲或電影歌曲等脈絡
- `tags`：主題標籤

## entries

- `id`：穩定識別碼
- `term`：詞語
- `tailo`：臺羅
- `partOfSpeech`：詞性或構詞類型
- `dictionaryDefinition`：辭典義
- `english`：英文釋義
- `interpretation`：編者的主觀語感筆記
- `languages`：語言標籤
- `reviewStatus`：校訂狀態
- `updatedAt`：最後更新日期
- `dictionary`：教育部辭典網址與匹配類型
- `occurrences`：跨歌曲用例

## occurrences

- `songId`：歌曲識別碼
- `lyric`：理解詞語所需的短歌詞
- `songMeaning`：該詞在這一句中的意思

## project（補充）

- `feedbackEmail`：校訂回報信箱；`githubRepository` 與本欄皆為 null 時，校訂入口顯示「籌備中」
- `referenceLinks`：「關於」區的延伸閱讀清單，每項含 `label` 與 `url`
