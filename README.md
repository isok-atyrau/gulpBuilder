# Сборщик проекта на Gulp

> Используется Gulp 4

## Начало работы

Для работы с данной сборкой в новом проекте, склонируйте все содержимое репозитория <br>
`git clone <this repo>`
Затем, находясь в корне проекта, запустите команду `npm i`, которая установит все находящиеся в package.json зависимости.
После этого вы можете использовать любую из четырех предложенных команд сборки (итоговые файлы попадают в папку __build__ корневой директории): <br>

`gulp` - базовая команда, которая запускает сборку для разработки, используя browser-sync.

`gulp build` - команда для сборки проекта без включения сервера browser-sync.

`gulp server` - команда, которая запускает сервер browser-sync. Команду стоит запускать когда в папке __build__ корневой директории уже есть файлы собранные файлы проекта, либо после команды `gulp build`.

`gulp clean` - команда удаления всех файлов из папки __build__ корневой директории.

## Структура папок и файлов

```
├── src/                          # Исходники
│   ├── blocks                    # Папка для хранения html-частей страницы
│   ├── img                       # Папка для хранения картинок
│   │   └── svg                   # Специальная папка для преобразования svg в спрайт
│   ├── js                        # Скрипты
│   │   ├── components            # js-компоненты
│   │   ├── libs                  # папка для загрузки локальных версий библиотек
│   │   ├── global.js             # файл с базовыми данными проекта - переменные, вспомогательные функции и т.д.
│   │   └── main.js               # Главный скрипт
│   ├── resources                 # папка для хранения иных ассетов - php, видео-файлы, favicon и т.д.
│   │   └── fonts                 # папка для хранения шрифтов в формате woff2
│   ├── scss                      # Стили сайта (препроцессор sass в scss-синтаксисе)
│   │   ├── blocks                # scss-компоненты
│   │   ├── libs                  # папка для хранения локальных css-стилей библиотек
│   │   ├── mixins                # папка для сохранения готовых scss-миксинов
│   │   ├── _fonts.scss           # Файл для подключения шрифтов (можно использовать миксин)
│   │   ├── _mixins.scss          # Файл для подключения миксинов из папки mixins
│   │   ├── _settings.scss        # Файл для написания глобальных стилей
│   │   ├── _vars.scss            # Файл для написания css- или scss-переменных
│   │   ├── lisbs.scss            # Файл для подключения стилей библиотек из папки vendor
│   │   └── main.scss             # Главный файл стилей, содержащий в себе как глобальные настройки, так и подключение всех нужных компонентов
│   └── index.html                # Главный html-файл
├── .csscomb.json                 # файл с настройками упорядочивания свойств css-файлов в сборке
├── .editorconfig                 # файл с настройками форматирования кода
├── .gitignore                    # файл, указывающий неотслеживаемые git'ом файлы и папки 
├── gulpfile.js                   # файл с настройками Gulp
├── package.json                  # файл с настройками сборки и установленными пакетами
└── README.md                     # документация сборки
```

## Оглавление
1. [npm-скрипты](#npm-скрипты)
2. [Работа с html](#работа-с-html)
3. [Работа с CSS](#работа-с-css)
4. [CSS-миксины](#css-миксины)
5. [Работа с JavaScript](#работа-с-javascript)
6. [Работа со шрифтами](#работа-со-шрифтами)
7. [Работа с изображениями](#работа-с-изображениями)
8. [Работа с иными ресурсами](#работа-с-иными-ресурсами)


## npm-скрипты

Вы можете вызывать gulp-скрипты через npm.

Также в сборке есть возможность проверять код на соответствие конфигу (editorconfig) и валидировать html.

`npm run dev` - команда, аналогичная команде gulp.

`npm run build` - команда, аналогичная команде gulp build.

`npm run server` - команда, аналогичная команде gulp server.

`npm run clean` - команда, аналогичная команде gulp clean.

## Работа с html

Благодаря плагину __gulp-file-include__ вы можете разделять html-файл на различные шаблоны, которые должны храниться в папке __blocks__. Удобно делить html-страницу на секции.

> Для вставки html-частей в главный файл используйте `@include('blocks/filename.html')`

Если вы хотите создать многостраничный сайт - копируйте __index.html__, переименовывайте как вам нужно, и используйте.

## Работа с CSS

В сборке используется препроцессор __sass__ в синтаксисе __scss__.

Стили, написанные в __blocks__, следует подключать в __main.scss__.

Стили из __fonts__, __settings__, __vars__ и __mixins__ так же подключены в __main.scss__.

Чтобы подключить сторонние css-файлы (библиотеки) - положите их в папку __libs__ и подключите в файле __libs.scss__.

> Для подключения css-библиотеки используйте команду `@import "./libs/library-name";`. Обратите внимание, что в конце имени файла библиотеки не пишется расширение .css!

Если вы хотите создать свой миксин - делайте это в папке __mixins__, а затем подключайте в файл __mixins.scss__.

> Для подключения файлов используйте директиву `@import`

В итоговой папке __build/css__ создаются два файла: <br> __main.css__ - для стилей страницы, <br> __libs.css__ - для стилей всех библиотек, использующихся в проекте.

> Файл __libs.css__ создается минифицированным.

## Работа с JavaScript

Поддержка `import` и `require` не реализована! Файлы собираются автоматически из различных папок.

JS-код лучше делить на компоненты - небольшие js-файлы, которые содержат свою, изолированную друг от друга реализацию. Такие файлы помещайте в папку __components__.

В файле __global.js__ должны храниться базовые данные проекта - переменные, какие-то вспомогательные функции.

В файле __main.js__ ничего не подключается, он рекомендуется для реализации общей логики сайта.

Чтобы подключить сторонние js-файлы (библиотеки) просто скопируйте их в папку __libs__.

Очередность выполнения js-кода в проекте: сначала выполняется код из файла __global.js__, затем код файлов в папке __components__ и в конце код из файла  __main.js__.

## Работа со шрифтами

Т.к. автор не поддерживает IE11, в сборке реализована поддержка только формата __woff2__ (это значит, что в миксине подключения шрифтов используется только данный формат).

Загружайте файлы __woff2__ в папку __resources/fonts__, а затем вызывайте миксин `@font-face` в файле __fonts.scss__.

## Работа с изображениями

Любые файлы изображений, кроме __favicon__ копируются в папку __img__.

Если вам нужно сделать svg-спрайт, кладите нужные для спрайта svg-файлы в папку __img/svg__. Иные svg-файлы просто оставляйте в папке __img__.

При использовании команд `gulp` и `gulp build`, вы получите минифицированные изображения в итоговой папке __build/img__.

## Работа с иными ресурсами

Любые ресурсы (ассеты) проекта, под которые не отведена соответствующая папка, должны храниться в папке __resources__. Это могут быть видео-файлы, php-файлы, favicon и прочие.


