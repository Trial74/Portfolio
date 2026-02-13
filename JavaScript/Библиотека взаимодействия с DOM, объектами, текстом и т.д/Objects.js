/*** 10.01.2025 / Objects.js from trial for UazFan project ***/

/**
 * Набор статических методов для Object
 */
export const StaticsMethodsObject = {

    /**
     * Проверяет является ли переменная объектом
     * @param object
     * @returns {boolean}
     */
    isObj: (object) => {
        return object != null && typeof object === 'object';
    },

    /**
     * Проверка на существования ключа в объекте
     * @param key
     * @param obj
     * @returns {boolean}
     */
    inObj: (key, obj) => {
        if (typeof key === 'string' && typeof obj === 'object') {
            return key in obj;
        }

        return false;
    },

    /**
     * Проверка на пустой объект
     * @param object
     * @returns {boolean}
     */
    emptyObj: (object) => {

        if (typeof object !== 'object')
            return true;

        return Object.keys(object).length === 0;
    },

    /**
     * Проверяет есть ли во входящем объекте параметров компонента настройки контекста для обёртывания компонента
     * @param object
     * @returns {boolean|*}
     */
    isContextComponent: (object) => {
        return UF.inObj('context', object.params) && !!object.params.context && typeof object.params.context === 'object' && UF.inObj('value', object.params.context);
    },

    /**
     * Возвращает параметры для контекста компонента
     * @param object
     */
    getContextComponent: (object) => {
        if (UF.isContextComponent(object)) {
            return object.params.context.value;
        }

        return false;
    },

    /**
     * Проверяет есть ли во входящем объекте параметров компонента пропсы для передачи их в компонент
     * @param object
     * @returns {boolean|*}
     */
    isPropsComponent: (object) => {
        return UF.inObj('props', object.params) && !!object.params.props && typeof object.params.props === 'object';
    },

    /**
     * Возвращает пропсы для компонента
     * @param object
     */
    getPropsComponent: (object) => {
        if (UF.isPropsComponent(object)) {
            return object.params.props;
        }

        return false;
    },

    /**
     * Получает значение ключа объекта по строке
     * @param object
     * @param string
     * @returns {*|boolean}
     */
    getValByString: (object, string) => {

        if (typeof object !== 'object' || typeof string !== 'string')
            return false;

        if (string.indexOf(':') !== -1) {
            let temp = string.split(':');
            string = temp.at(-1);
        }

        let objResult = string.split('.').reduce((o, k) => (o || {})[k], object);

        return objResult === undefined ? object : objResult;
    },

    /**
     * Получить имя объекта по строке в формате "auth:user.id" где "auth" имя объекта
     * либо это может быть просто строка с наименованием тогда она вернётся в переданном виде
     * @param string
     * @returns {string}
     */
    getNameObject: (string) => {

        if (typeof string !== 'string')
            return string;

        let dataParams = string.split(':');

        return dataParams[0];
    },

    /**
     * Ищет в массиве объектов объект по значению ключа и возращает его индекс в массиве либо -1 если не найдено
     * @param array - массив объектов
     * @param key - ключ для поиска
     * @param value - значение ключа
     * @returns {number}
     */
    findIndexByKey: function(array, key, value) {
        if (!Array.isArray(array)) return -1;

        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            if (item && item[key] === value) {
                return i;
            }
        }

        return -1;
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Object
 */
export const InstanceMethodsObject = {

}
