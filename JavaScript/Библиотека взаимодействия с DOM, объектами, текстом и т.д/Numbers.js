/*** 19.09.2024 / Numbers.js from trial for UazFan project ***/

/**
 * Набор статических методов для Number
 */
export const StaticsMethodsNumber = {

    /**
     * Приведение чисел к формату
     * @param n
     * @returns {string}
     */
    formatNum: n => n >= 1000 ? `${(n / 1000).toFixed(1)}К` : `${n}`

}

/**
 * Набор методов экземпляра UF библиотеки для Number
 */
export const InstanceMethodsNumber = {

}
