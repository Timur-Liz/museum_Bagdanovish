# Багдановіч × Моладзь — сайт пра Максіма Багдановіча

## Як запусціць у VS Code (лакальна)

1. Адкрыйце **папку праекта** (дзе ляжыць `package.json`): `File → Open Folder`.
2. Адкрыйце тэрмінал: `Terminal → New Terminal` (або `Ctrl + `` `).
3. Выканайце:
   ```bash
   npm install
   npm run dev
   ```
4. У тэрмінале з'явіцца спасылка `http://localhost:5173/` — зацісніце `Ctrl` і клікніце па ёй. Сайт адкрыецца ў браўзеры.

> Не адкрывайце `index.html` падвойным клікам і не праз Live Server — React так не запусціцца.
> Гатовую зборку можна паглядзець праз `npm run build`, потым `npm run preview`.

## Як апублікаваць на GitHub Pages (правільна)

> ⚠️ Галоўная памылка: уключыць Pages у рэжыме «Deploy from a branch» на галіне `main`.
> Тады GitHub паказвае **зыходны** `index.html` (са спасылкай на `/src/main.tsx`), і будзе белы экран.

Правільны спосаб — дэплой **сабранага** `dist/` праз GitHub Actions (у праекце ўжо ёсць файл `.github/workflows/deploy.yml`):

1. Запусце праект на GitHub (калі яшчэ не):
   ```bash
   git init
   git add .
   git commit -m "Багдановіч × Моладзь"
   git branch -M main
   git remote add origin https://github.com/ВАШ-ЛОГІН/НАЗВА-РЭПА.git
   git push -u origin main
   ```
2. На GitHub адкрыйце рэпазіторый → укладка **Settings → Pages**.
3. У раздзеле **Build and deployment** у поле **Source** выберыце **GitHub Actions** (не «Deploy from a branch»!).
4. Зрабіце любы новы push у `main` (або ўкладка **Actions → Deploy to GitHub Pages → Run workflow**).
5. Праз 1–2 хвіліны сайт будзе даступны па адрасе:
   `https://ВАШ-ЛОГІН.github.io/НАЗВА-РЭПА/`

Кожны наступны `git push` у `main` будзе аўтаматычна перабудоўваць і абнаўляць сайт.

## Што ў праекце

- `src/App.tsx` — увесь сайт (hero, «Вянок» са сканамі, вершы, відэа, дакументы, квіз, сцяна моладзі)
- `src/real.ts` — толькі сапраўдныя матэрыялы (Wikimedia Commons, YouTube, архівы)
- `src/data.ts` — пытанні квіза
- Зборка — адзін файл `dist/index.html` (плагін `vite-plugin-singlefile`), таму працуе на любым хостынгу.
