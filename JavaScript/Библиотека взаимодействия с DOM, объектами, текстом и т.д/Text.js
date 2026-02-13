/*** 28.10.2024 / Text.js from trial for UazFan project ***/

/**
 * Набор статических методов для Text
 */
export const StaticsMethodsText = {
    /**
     * Возврщает первую букву или первые две буквы слов для отсутствующего аватара
     * @param text
     * @returns {*}
     */
    getLettersForAvatar: (text) => {
        return text.split(/\s+/).map((w, i) => i <= 1 ? w.substring(0, 1).toUpperCase() + '' : '').join('');
    },

    /**
     * Преобразует строку в код цвета
     * @param str
     * @returns {string}
     */
    stringToColor: (str) => {
        let hash = 0, color = '#', i, value;

        if (!str) {
            return color + '333333';
        }

        for (i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        for (i = 0; i < 3; i++) {
            value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).slice(-2);
        }

        return color;
    },

    /**
     * Возвращает контрастный цвет текста переданному цвету фона
     * @param bgColor
     * @returns {string}
     */
    getTextColor: (bgColor) => {
        const rgb = parseInt(bgColor.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        return ((r * 0.299 + g * 0.587 + b * 0.114) > 186) ? '#000000' : '#FFFFFF';
    },

    /**
     * Формирует ФИО если не заполнены возвращает nickname либо false
     * @param dataUser
     * @returns {*|string|string|boolean}
     */
    getUserName: (dataUser) => {
        if (typeof dataUser === 'object') {
            let result;

            if ('userName' in dataUser || 'second_name' in dataUser || 'last_name' in dataUser) {
                if (dataUser.userName !== '') {
                    result = (dataUser.userName) + ' ' + (dataUser.second_name ? (' ' + dataUser.second_name) : '') + (dataUser.last_name ? (' ' + dataUser.last_name) : '');

                    return result;
                } else if ('nick_name' in dataUser && dataUser.nick_name !== '') {

                    return dataUser.nick_name;
                }
            } else if ('nick_name' in dataUser && dataUser.nick_name !== '') {

                return dataUser.nick_name;
            }
        }

        return false;
    },

    /**
     * Возвращает текущий год
     * @returns {number}
     */
    getYear: () => {
        return new Date().getFullYear()
    },

    /**
     * Проверяет что в переменной строка
     * @param str
     * @returns {boolean}
     */
    isString: (str) => {
        return typeof str === 'string';
    },

    trim: (text) => {
        if (text === null || text === undefined) {
            return '';
        }

        // Преобразуем в строку и удаляем пробелы с обеих сторон
        return String(text).replace(/^\s+|\s+$/g, '');
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Object
 */
export const InstanceMethodsText = {

}
