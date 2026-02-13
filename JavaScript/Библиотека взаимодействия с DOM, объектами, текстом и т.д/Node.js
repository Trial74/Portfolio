/*** 23.12.2024 /Node.js from trial for UazFan project ***/

/**
 * Вспомогательная функция модуля (описание потом добавить!)
 * @param property
 * @returns {*|string}
 */
function normalizePropertyName(property) {
    if (/[A-Z]/.test(property)) {
        return property.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }
    return property;
}

/**
 * Набор статических методов для Node
 */
export const StaticsMethodsNode = {

    /**
     * Определяет является ли переменная нодой
     * @param node
     * @returns {boolean}
     */
    isDOM: function (node) {
        return node instanceof Node;
    },

    /**
     * Проверяет наличие класса у Node элемента
     * @param node
     * @param nodeClass
     * @returns {boolean}
     */
    hasClass: function (node, nodeClass) {
        if(UF.isDOM(node)){
            return node.classList.contains(nodeClass);
        }

        return false;
    },

    /**
     * Добавляет класс элементу
     * @param node
     * @param nodeClass
     */
    addClass: function (node, nodeClass) {
        if(UF.isDOM(node) && nodeClass !== ''){
            node.classList.add(nodeClass);
        }
    },

    /**
     * Удаляет класс у элемента
     * @param node
     * @param nodeClass
     */
    removeClass: function (node, nodeClass) {
        if(UF.isDOM(node)) {
            node.classList.remove(nodeClass);
        }
    },

    /**
     * Проверяет чекбокс на состояние
     * @param checkbox
     * @returns {*|boolean}
     */
    isChecked: function (checkbox) {
        if(UF.isDOM(checkbox) && checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox'){
            return checkbox.checked;
        }

        return false;
    },

    /**
     * Возвращает значение INPUT
     * @param input
     * @returns {*|boolean}
     */
    getVal: function (input) {
        if(UF.isDOM(input) && input.tagName === 'INPUT'){
            return input.value;
        }

        return false;
    },

    /**
     * Проверяет наличие скролла у элемента и прокручивает его в самый низ
     * @param {HTMLElement} element - HTML элемент для проверки и прокрутки
     * @param {Object} options - Дополнительные опции прокрутки
     * @param {string} options.behavior - Поведение прокрутки ('auto' или 'smooth')
     * @param {number} options.offset - Дополнительное смещение от нижнего края
     * @returns {boolean} true - если скролл присутствует и прокрутка выполнена, false - если скролла нет
     *
     * @example
     * // Простая прокрутка элемента с id="chat"
     * scrollToBottom(document.getElementById('chat'));
     *
     * @example
     * // Плавная прокрутка с дополнительным смещением
     * scrollToBottom(document.querySelector('.messages'), {
     *   behavior: 'smooth',
     *   offset: 10
     * });
     */
    scrollToBottom: (element, options = {}) => {
        if (!element) {
            console.warn('Элемент не найден');
            return false;
        }

        const { behavior = 'auto', offset = 0 } = options;
        const hasVerticalScroll = element.scrollHeight > element.clientHeight;

        if (hasVerticalScroll) {
            element.scrollTo({
                top: element.scrollHeight - element.clientHeight + offset,
                behavior: behavior
            });

            return true;
        }

        return false;
    },

    /**
     * Извлекает текстовое содержимое из contentEditable элемента через API выделения (Selection).
     * Функция использует временное выделение содержимого ноды для получения текста,
     * после чего восстанавливает оригинальное состояние выделения пользователя.
     *
     * @param {Node} node - DOM-узел (элемент) с атрибутом contentEditable, из которого нужно извлечь текст.
     *                      Должен быть валидным DOM-узлом.
     *
     * @returns {string} - Текстовое содержимое переданной ноды.
     *                     Возвращает пустую строку в случае ошибки или невалидного параметра.
     *
     * @throws {Error} - Функция перехватывает возможные ошибки и возвращает пустую строку,
     *                   но логирует ошибку в консоль для отладки.
     *
     * @example
     * // HTML: <div contenteditable="true">Hello <b>world</b>!</div>
     * const editableDiv = document.querySelector('[contenteditable="true"]');
     * const text = getContentEditableNode(editableDiv);
     * console.log(text); // "Hello world!"
     *
     * @example
     * // Использование с React ref
     * const content = getContentEditableNode(editableRef.current);
     *
     */
    getContentEditableNode: (node) => {
        if (!node || !UF.isDOM(node)) return '';

        try {
            const originalSelection = window.getSelection();
            const originalRangeCount = originalSelection.rangeCount;
            const originalRanges = [];

            for (let i = 0; i < originalRangeCount; i++) {
                originalRanges.push(originalSelection.getRangeAt(i));
            }

            const range = document.createRange();
            range.selectNodeContents(node);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            const content = selection.toString();

            selection.removeAllRanges();
            originalRanges.forEach(originalRange => {
                selection.addRange(originalRange);
            });

            return content;
        } catch (error) {
            console.error('Error getting content from contentEditable node:', error);
            return '';
        }
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Node
 */
export const InstanceMethodsNode = {

    /**
     * Проверяет наличие класса у Node элемента
     * @param nodeClass
     * @returns {boolean}
     */
    hasClass: function (nodeClass) {
        if(UF.isDOM(this[0])){
            return this[0].classList.contains(nodeClass);
        }
    },

    /**
     * Добавляет класс элементу
     * @param nodeClass
     */
    addClass: function (nodeClass) {
        if(UF.isDOM(this[0]) && nodeClass !== ''){
            this[0].classList.add(nodeClass);
        }

        return this;
    },

    /**
     * Удаляет класс у элемента
     * @param nodeClass
     */
    removeClass: function (nodeClass) {
        if(UF.isDOM(this[0])) {
            this[0].classList.remove(nodeClass);
        }

        return this;
    },

    /**
     * Проверяет чекбокс на состояние
     * @returns {*|boolean}
     */
    isChecked: function () {
        if(UF.isDOM(this[0]) && this[0].tagName === 'INPUT' && this[0].type === 'checkbox'){
            return this[0].checked;
        }

        return false;
    },

    /**
     * Возвращает значение INPUT
     * @returns {*|boolean}
     */
    getVal: function () {
        if(UF.isDOM(this[0]) && this[0].tagName === 'INPUT'){
            return this[0].value;
        }

        return false;
    },

    show: function () {
        return this[0].style('display', '');
    },

    hide: function () {
        return this[0].style('display', 'none');
    },

    toggle: function () {
        return this.each(function() {
            const display = window.getComputedStyle(this).display;
            this.style.display = display === 'none' ? '' : 'none';
        });
    },

    style: function (property, value) {

        if (arguments.length === 1 && typeof property === 'string') {
            if (this.length === 0) return undefined;

            const element = this[0];
            const normalizedProperty = normalizePropertyName(property);
            const computedStyle = window.getComputedStyle(element);

            return computedStyle.getPropertyValue(normalizedProperty);
        }

        if (arguments.length === 2) {
            const normalizedProperty = normalizePropertyName(property);

            return this.each(function() {
                this.style[normalizedProperty] = value;
            });
        }

        if (typeof property === 'object') {
            return this.each(function() {
                for (let key in property) {
                    if (property.hasOwnProperty(key)) {
                        const normalizedKey = normalizePropertyName(key);
                        this.style[normalizedKey] = property[key];
                    }
                }
            });
        }

        if (arguments.length === 0) {
            if (this.length === 0) return undefined;

            const element = this[0];
            const computedStyle = window.getComputedStyle(element);
            const styles = {};

            for (let i = 0; i < computedStyle.length; i++) {
                const prop = computedStyle[i];
                styles[prop] = computedStyle.getPropertyValue(prop);
            }

            return styles;
        }

        return this;
    },

    text: function(value) {
        // Геттер - возвращает текстовое содержимое первого элемента
        if (value === undefined) {
            if (this.length === 0) return '';

            // jQuery-совместимое получение текста
            return this[0].textContent ||
                this[0].innerText ||
                (this[0].text || '');
        }

        // Сеттер - устанавливает текстовое содержимое всем элементам
        return this.each(function(element) {
            // jQuery использует textContent для установки
            if (element.textContent !== undefined) {
                element.textContent = value;
            } else if (element.innerText !== undefined) {
                element.innerText = value;
            } else if (element.text !== undefined) {
                element.text = value;
            }
        });
    },

    getContentEditableNode: () => {
        if (this.length === 0 || !UF.isDOM(this[0])) return '';

        return UF.getContentEditableNode(this[0]);
    },

    /**
     * Поиск элементов внутри текущего элемента(ов)
     * @param {string} selector - CSS селектор
     * @returns {Object} UF объект с найденными элементами
     */
    find: function(selector) {
        if (!selector || typeof selector !== 'string') {
            return UF([]);
        }

        // Собираем все найденные элементы
        let foundElements = [];

        this.each(function() {
            // Проверяем, что это DOM-элемент
            if (this.nodeType && this.nodeType === 1) {
                const elements = this.querySelectorAll(selector);
                foundElements.push(...Array.from(elements));
            }
        });

        // Удаляем дубликаты (на случай если элементы находятся в нескольких родителях)
        foundElements = Array.from(new Set(foundElements));

        return UF(foundElements);
    }
}
