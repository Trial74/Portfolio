# UF — Библиотека взаимодействия с DOM, объектами, текстом и т.д.

**UF** — это JavaScript-библиотека, основанная на jQuery-подобном синтаксисе, но расширенная дополнительными методами для работы с DOM-элементами, формами, текстом, объектами, датами и другими задачами, используемыми в проектах.

## Особенности

- **jQuery-подобный синтаксис** — интуитивно понятный API для работы с DOM
- **Модульная архитектура** — разделение функциональности по модулям
- **Статические и экземплярные методы** — гибкость использования
- **Расширенные возможности** — работа с формами, текстом, датами, объектами, уведомлениями
- **Легковесность** — только необходимый функционал без лишних зависимостей

## Структура библиотеки

Библиотека состоит из следующих модулей:

- **UF.js** — ядро библиотеки (конструктор и базовая функциональность)
- **InitCore.js** — инициализация и подключение всех модулей
- **Node.js** — работа с DOM-узлами
- **Form.js** — работа с формами и их элементами
- **Text.js** — работа с текстом и строками
- **Numbers.js** — работа с числами
- **Objects.js** — работа с объектами
- **Date.js** — работа с датами и временем
- **Toast.js** — система уведомлений
- **Other.js** — прочие утилиты

## Установка и подключение

```javascript
// Импорт основного файла (подключает все модули)
import '@/Core/InitCore';

// Теперь UF доступен глобально
const elements = UF('.my-class');
```

## Основное использование

### Создание UF-объекта

```javascript
// По CSS-селектору
const elements = UF('.my-class');
const byId = UF('#my-id');

// Из DOM-элемента
const element = UF(document.querySelector('.element'));

// Из HTML-строки
const newElement = UF('<div class="new">Content</div>');

// Из массива элементов
const fromArray = UF([elem1, elem2, elem3]);
```

### Цепочка методов (chaining)

```javascript
UF('.button')
    .addClass('active')
    .style('color', 'red')
    .text('Нажми меня');
```

## Модули и методы

### Node.js — Работа с DOM

#### Статические методы

```javascript
// Проверка, является ли переменная DOM-узлом
UF.isDOM(node); // boolean

// Работа с классами
UF.hasClass(node, 'my-class'); // boolean
UF.addClass(node, 'my-class');
UF.removeClass(node, 'my-class');

// Работа с input
UF.isChecked(checkbox); // boolean
UF.getVal(input); // string | false

// Прокрутка элемента вниз
UF.scrollToBottom(element, {
    behavior: 'smooth', // 'auto' | 'smooth'
    offset: 10
});

// Получение текста из contentEditable
UF.getContentEditableNode(node); // string
```

#### Методы экземпляра

```javascript
const $el = UF('.element');

// Классы
$el.hasClass('active'); // boolean
$el.addClass('active');
$el.removeClass('active');

// Стили
$el.style('color', 'red'); // установка одного стиля
$el.style({ color: 'red', fontSize: '16px' }); // установка нескольких
const color = $el.style('color'); // получение стиля
const allStyles = $el.style(); // получение всех стилей

// Видимость
$el.show();
$el.hide();
$el.toggle();

// Текст
$el.text('Новый текст'); // установка
const text = $el.text(); // получение

// Поиск внутри элемента
$el.find('.child'); // UF-объект с найденными элементами

// Чекбоксы и input
$el.isChecked(); // boolean
$el.getVal(); // string | false
```

### Form.js — Работа с формами

#### Статические методы

```javascript
// Преобразование формы в массив объектов {name, value}
const formData = UF.formToArray('#my-form');

// Проверка текстового поля на пустоту
const isEmpty = UF.emptyTextField(inputElement); // boolean

// Работа с ошибками полей
UF.addErrorField('fieldName', 'Текст ошибки');
UF.clearErrorField('fieldName');
```

#### Методы экземпляра

```javascript
const $form = UF('#my-form');

// Сериализация формы в массив
const data = $form.serializeArray();
// Возвращает: [{name: 'field1', value: 'value1'}, ...]

// Проверка поля на пустоту
const isEmpty = UF('input[name="email"]').emptyTextField(); // boolean
```

### Text.js — Работа с текстом

```javascript
// Получение букв для аватара (первые буквы слов)
UF.getLettersForAvatar('Иван Петров'); // "ИП"

// Преобразование строки в цвет
UF.stringToColor('username'); // "#a3f5c2"

// Получение контрастного цвета текста
UF.getTextColor('#ffffff'); // "#000000" или "#FFFFFF"

// Формирование ФИО из объекта пользователя
const userName = UF.getUserName({
    userName: 'Иван',
    second_name: 'Петрович',
    last_name: 'Сидоров',
    nick_name: 'ivan123'
}); // "Иван Петрович Сидоров" или "ivan123" если нет ФИО

// Получение текущего года
UF.getYear(); // 2025

// Проверка типа
UF.isString('text'); // true

// Обрезка пробелов
UF.trim('  text  '); // "text"
```

### Numbers.js — Работа с числами

```javascript
// Форматирование чисел (1000 -> "1.0К")
UF.formatNum(1500); // "1.5К"
UF.formatNum(500); // "500"
```

### Objects.js — Работа с объектами

```javascript
// Проверка типа
UF.isObj({}); // true
UF.isObj(null); // false

// Проверка наличия ключа
UF.inObj('key', {key: 'value'}); // true

// Проверка на пустой объект
UF.emptyObj({}); // true
UF.emptyObj({key: 'value'}); // false

// Работа с компонентами
UF.isContextComponent(object); // boolean
UF.getContextComponent(object); // value | false
UF.isPropsComponent(object); // boolean
UF.getPropsComponent(object); // props | false

// Получение значения по строке пути
const user = {profile: {name: 'John'}};
UF.getValByString(user, 'profile.name'); // "John"
UF.getValByString(user, 'auth:user.profile.name'); // "John" (игнорирует префикс)

// Получение имени объекта из строки
UF.getNameObject('auth:user.id'); // "auth"

// Поиск индекса в массиве объектов
const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
UF.findIndexByKey(users, 'id', 2); // 1
UF.findIndexByKey(users, 'id', 3); // -1
```

### Date.js — Работа с датами

```javascript
// Форматирование даты для мессенджеров
// Сегодня -> время "14:30"
// Последние 7 дней -> день недели "Пн"
// Старше 7 дней -> дата "21.10.2025"
UF.formatMessengerDate(1761068277); // "21.10.2025"
UF.formatMessengerDate(1761068277, true); // "14:30" (принудительно время)

// Относительное время
UF.formatRelativeTime("2025-12-26T14:30:18.000000Z"); // "1 ч назад"
UF.formatRelativeTime("2025-12-25T18:30:18"); // "1 д назад"
UF.formatRelativeTime("2024-03-01 12:00:00"); // "1 мар 2024"
UF.formatRelativeTime(new Date(Date.now() - 30000), { showSeconds: true }); // "30 сек назад"
```

### Toast.js — Система уведомлений

```javascript
// Создание уведомления
UF.toast({
    title: 'Заголовок', // или false для скрытия заголовка
    text: 'Текст уведомления',
    type: 'default', // тип уведомления
    autohide: true, // автоматическое скрытие
    interval: 5000, // время показа в мс
    hideEvent: () => {
        // callback при скрытии
    }
});
```

### Other.js — Прочие утилиты

```javascript
// Получение имени файла из URL
UF.getNameFileByUrl('https://example.com/path/to/file.jpg'); // "file.jpg"

// Управление лоадером кнопки
UF.setBtnLoader(buttonElement, true); // включить лоадер
UF.setBtnLoader(buttonElement, false); // выключить лоадер

// Вычисление размеров модального окна для изображений
const size = UF.calculateModalImagePostSize([
    {width: 1920, height: 1080},
    {width: 800, height: 600}
], {
    sidePanelWidth: 310,
    bottomPanelHeight: 50,
    minMargin: 20,
    maxWidth: window.innerWidth * 0.9,
    maxHeight: window.innerHeight * 0.9
});
// Возвращает: {width: 1234, height: 678}
```

## Примеры использования

### Работа с формами

```javascript
// Получение данных формы
const formData = UF.formToArray('#login-form');
// [{name: 'email', value: 'user@example.com'}, {name: 'password', value: '***'}]

// Валидация поля
if (UF.emptyTextField(document.querySelector('input[name="email"]'))) {
    UF.addErrorField('email', 'Поле обязательно для заполнения');
} else {
    UF.clearErrorField('email');
}
```

### Работа с DOM

```javascript
// Добавление класса и стилей
UF('.button')
    .addClass('active')
    .style({
        backgroundColor: '#007bff',
        color: 'white'
    });

// Прокрутка чата вниз
UF.scrollToBottom(document.querySelector('.chat-messages'), {
    behavior: 'smooth'
});
```

### Работа с текстом и объектами

```javascript
// Генерация аватара
const avatarText = UF.getLettersForAvatar('Иван Петров'); // "ИП"
const avatarColor = UF.stringToColor('Иван Петров'); // "#a3f5c2"
const textColor = UF.getTextColor(avatarColor); // "#000000" или "#FFFFFF"

// Получение значения из объекта
const user = {
    auth: {
        user: {
            profile: {
                name: 'John'
            }
        }
    }
};
const name = UF.getValByString(user, 'auth:user.profile.name'); // "John"
```

### Уведомления

```javascript
// Простое уведомление
UF.toast({
    text: 'Операция выполнена успешно',
    type: 'success',
    autohide: true,
    interval: 3000
});

// Уведомление с заголовком
UF.toast({
    title: 'Ошибка',
    text: 'Не удалось сохранить данные',
    type: 'error',
    autohide: false
});
```

## Зависимости

- **jQuery** — не требуется, библиотека является самостоятельной
- Все модули используют стандартные Web API

## Совместимость

Библиотека использует современные стандарты JavaScript (ES6+) и работает во всех современных браузерах, поддерживающих:
- ES6+ синтаксис
- `querySelector` / `querySelectorAll`
- `classList`
- `Array.from`
- Стрелочные функции

## Файлы библиотеки

- `UF.js` — ядро библиотеки
- `InitCore.js` — инициализация модулей
- `Node.js` — модуль работы с DOM
- `Form.js` — модуль работы с формами
- `Text.js` — модуль работы с текстом
- `Numbers.js` — модуль работы с числами
- `Objects.js` — модуль работы с объектами
- `Date.js` — модуль работы с датами
- `Toast.js` — модуль уведомлений
- `Other.js` — прочие утилиты

## Лицензия

Библиотека разработана для использования в проектах UazFan.
