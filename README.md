# Shopify Test

Цей репозиторій містить дві окремі частини:
- `markup/` — середовище фронтенд-розробки з Gulp (SCSS → CSS, JS, оптимізація зображень, BrowserSync, збірки `build`/`dist`).
- `impl/` — реалізація теми Shopify (Liquid + структура теми). 

Нижче — покрокові інструкції для кожної частини та як їх поєднати.

---

## Вимоги
- Node.js LTS (рекомендовано 18.x або 20.x) і npm
- Для роботи з темою Shopify: Shopify CLI
  - macOS: `brew tap shopify/shopify && brew install shopify-cli`
  - Windows: `choco install shopify-cli` або `winget install Shopify.ShopifyCLI`
  - Linux: див. офіційну інструкцію https://shopify.dev/docs/themes/tools/cli

> Порада: перевірте встановлення командою `node -v`, `npm -v`, `shopify version`.

---


## Імплементація теми Shopify (папка `impl/`)
Це робоча директорія теми Shopify з типовою структурою: `assets/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`.

### Підключення до магазину
1. Встановіть Shopify CLI (див. розділ Вимоги).
2. Увійдіть у свій магазин:
   ```bash
   shopify login --store your-store.myshopify.com
   ```
3. Запустіть локальну розробку теми з автоперезавантаженням:
   ```bash
   cd impl
   shopify theme dev
   ```
   Команда відкриє прев’ю теми в браузері і буде слідкувати за змінами у файлах Liquid/CSS/JS/Assets.

### Деплой змін у тему
- Завантажити (push) локальні зміни в магазин:
  ```bash
  shopify theme push
  ```
- Завантажити (pull) актуальні файли теми з магазину в локальний репозиторій:
  ```bash
  shopify theme pull
  ```

> Перед `push` переконайтеся, що зібрали оновлені статичні файли з `markup` (див. нижче), і вони поміщені в `impl/assets/`.

---

## Маркап (папка `markup/`)
Середовище для верстки з використанням Gulp 4 і BrowserSync.

### Структура
- `src/` — вихідні файли (редагуєте тут)
  - `scss/` — стилі (вхідна точка `scss/main.scss`)
  - `js/` — скрипти (`src/js/*.js`)
  - `*.html` — сторінки (підтримується імпорт через rigger `//= include`)
  - `sourceimages/` — вихідні зображення
- `dist/` — зібрані статичні файли (генерується автоматично)
  - `css/`, `js/`, `images/`, `fonts/`

### Встановлення залежностей
```bash
cd markup
npm install
```

### Режими роботи
- Розробка з live-reload (BrowserSync):
  ```bash
  npx gulp
  ```
  Це виконає `build` та підніме локальний сервер (за замовчуванням http://localhost:3000) із вотчером.

- Збірка для розробки (із sourcemaps):
  ```bash
  npx gulp build
  ```

- Продакшн-збірка (мінімізація, без sourcemaps):
  ```bash
  npx gulp dist
  ```

### Куди класти файли під час верстки
- SCSS: `src/scss/` (головний файл `main.scss`)
- JS: `src/js/`
- HTML: `src/*.html` (і частини через rigger у підпапках, якщо потрібно)
- Зображення: `src/sourceimages/`

Після збірки готові артефакти будуть у `dist/`.

---

## Корисні посилання
- Shopify CLI: https://shopify.dev/docs/themes/tools/cli
- Розробка тем Shopify: https://shopify.dev/docs/themes
- Gulp: https://gulpjs.com/

---
