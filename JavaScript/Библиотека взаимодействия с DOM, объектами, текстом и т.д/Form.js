/*** 19.09.2024 / Form.js from trial for UazFan project ***/

/**
 * Набор статических методов для Text
 */
export const StaticsMethodsForm = {

    /**
     * Формирует массив из формы с именем поля и значением, также обрабатывает неактивные чекбоксы
     * не обрабатывает файлы
     * @param form - идентификатор формы строкой (прим. #id_form)
     * @returns {obj}
     */
    formToArray: function (form) {
        let data = UF(form).serializeArray();
        UF("form"+form+" input[type='checkbox']:not(:checked)").each(function () {
            data.push({name: this.name, value: this.checked ? this.value : 'N'});
        });
        return data;
    },

    /**
     * Проверка конкретного текстового поля на пустоту
     * @param domField - DOM элемент в виде текстового поля INPUT type - text
     */
    emptyTextField: function (domField) {
        return UF.trim(UF(domField)[0].value).length === 0
    },

    /**
     * Функция добавления текста ошибки к полю
     * Обращается к полю по "name"
     * блок с ошибкой должен иметь идентификатор "err_name"
     * добавляет класс "error_name" для последующей проверки
     */
    addErrorField: function (name, mess) {
        if (!!name && !!mess) {
            UF('input[name="' + name + '"]').addClass('error_' + name).style({
                'border-color': '#fda5a5',
                'background-color': '#fdeaea'
            });
            UF('#err_' + name).text(mess);
        }
    },

    /**
     * Функция очистки текста от ошибки поля
     * Обращается к полю по "name"
     * блок с ошибкой должен иметь идентификатор "err_name"
     */
    clearErrorField: function (name) {
        let field = UF('input[name="' + name + '"]');
        if (!!field && field.hasClass('error_' + name)) {
            field.css({'border-color': '', 'background-color': ''});
            field.removeClass('error_' + name);
            UF('#err_' + name).text('');
        }
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Form
 */
export const InstanceMethodsForm = {

    serializeArray: function() {
        const result = [];

        this.each(function(element) {
            // Работаем только с формами и элементами форм
            if (element.tagName !== 'FORM' && !element.name) return;

            const elements = element.tagName === 'FORM' ?
                element.elements : [element];

            Array.from(elements).forEach(formElement => {
                if (!formElement.name ||
                    formElement.disabled ||
                    formElement.type === 'file' ||
                    (formElement.type === 'checkbox' && !formElement.checked) ||
                    (formElement.type === 'radio' && !formElement.checked)) {
                    return;
                }

                // Обрабатываем multi-select
                if (formElement.tagName === 'SELECT' && formElement.multiple) {
                    Array.from(formElement.selectedOptions).forEach(option => {
                        result.push({
                            name: formElement.name,
                            value: option.value
                        });
                    });
                } else {
                    result.push({
                        name: formElement.name,
                        value: formElement.value
                    });
                }
            });
        });

        return result;
    },

    /**
     * Проверка конкретного текстового поля на пустоту
     */
    emptyTextField: function () {
        return UF.trim(this[0].value).length === 0
    },
}
