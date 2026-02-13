/*** 24.12.2024 / UF.js from trial for UazFan project ***/

(function(global) {
    'use strict';

    // Конструктор UF
    const UF = function(selector, context) {
        return new UF.init(selector, context);
    };

    UF.fn = UF.prototype = {
        constructor: UF,

        // Инициализация коллекции элементов
        init: function(selector, context) {

            if (!(this instanceof UF.init)) {
                return new UF.init(selector, context);
            }

            // Если селектор не передан, возвращаем пустую коллекцию
            if (!selector) {
                this.length = 0;
                return this;
            }

            // Если передан DOM-элемент
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            }

            // Если передан объект UF
            if (selector instanceof UF) {
                return selector;
            }

            // Поиск элементов в DOM
            context = context || document;
            let elements;

            // Обработка строкового селектора
            if (typeof selector === 'string') {
                // Проверка на HTML-строку (например, '<div>...</div>')
                if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
                    // Создание элемента из HTML-строки
                    const div = document.createElement('div');
                    div.innerHTML = selector;
                    elements = Array.from(div.childNodes);
                } else {
                    // Поиск элементов в DOM
                    elements = Array.from(context.querySelectorAll(selector));
                }
            }
            // Обработка массива или коллекции элементов
            else if (Array.isArray(selector) || selector instanceof NodeList || selector instanceof HTMLCollection) {
                elements = Array.from(selector);
            }

            // Заполнение коллекции UF
            for (let i = 0; i < elements.length; i++) {
                this[i] = elements[i];
            }
            this.length = elements.length;

            return this;
        },

        each: function(callback) {
            for (let i = 0; i < this.length; i++) {
                callback.call(this[i], this[i], i);
            }
            return this;
        }

    };

    UF.init = function(selector, context) {
        return new UF.fn.init(selector, context);
    };

    UF.init.prototype = UF.fn.init.prototype = UF.fn;

    // Глобальная функция UF как алиас для UF
    global.UF = UF;

})(window);
