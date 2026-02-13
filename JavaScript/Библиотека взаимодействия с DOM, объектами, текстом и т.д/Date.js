/*** 23.10.2025 / Date.js from trial for UazFan project ***/

/**
 * Набор статических методов для Date
 */
export const StaticsMethodsDate = {
    /**
     * Преобразует UNIX timestamp в строку для отображения дат сообщений
     *
     * Функция форматирует дату по следующим правилам:
     * - Если дата сегодняшняя: возвращает время в формате `hh:mm`
     * - Если дата в течение последних 7 дней (но не сегодня): возвращает сокращенное название дня недели (`Пн`, `Вт`, `Ср` и т.д.)
     * - Если дата старше 7 дней: возвращает дату в формате `dd.mm.yyyy`
     *
     * @param {number} timestamp - UNIX timestamp в секундах
     * @param {boolean} getTime - вернуть время в формате `hh:mm`
     * @returns {string} Отформатированная строка даты
     *
     * @example
     * // Текущее время (сегодня)
     * formatTelegramDate(Math.floor(Date.now() / 1000)); // "14:30"
     *
     * @example
     * // Вчера
     * formatTelegramDate(Math.floor(Date.now() / 1000) - 86400); // "Пн"
     *
     * @example
     * // Неделю назад или более
     * formatTelegramDate(1761068277); // "21.10.2025"
     */
    formatMessengerDate: (timestamp, getTime = false) => {
        const date = new Date(timestamp * 1000);
        const now = new Date();

        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const diffTime = today - inputDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const formatTime = (date) => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        if (diffDays === 0 || getTime) {
            return formatTime(date);
        }

        if (diffDays > 0 && diffDays < 7) {
            return dayNames[date.getDay()];
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    },

    /**
     * Преобразует дату в строку формата "1 ч назад", "1 д назад", "1 мар 2024"
     *
     * @param {string|Date} dateInput - Дата в строковом формате или объект Date
     * @param {Object} options - Дополнительные опции
     * @param {boolean} options.showSeconds - Показывать секунды для недавних дат (например "30 сек назад") (по умолчанию true)
     * @returns {string} Отформатированная строка даты
     *
     * @example
     * // Сегодня
     * formatRelativeTime("2025-12-26T14:30:18.000000Z"); // "1 ч назад" (если сейчас 15:30)
     *
     * @example
     * // Вчера или в течение недели
     * formatRelativeTime("2025-12-25T18:30:18"); // "1 д назад"
     *
     * @example
     * // Больше недели назад
     * formatRelativeTime("2024-03-01 12:00:00"); // "1 мар 2024"
     *
     * @example
     * // С секундами
     * formatRelativeTime(new Date(Date.now() - 30000), { showSeconds: true }); // "30 сек назад"
     */
    formatRelativeTime: (dateInput, options = {}) => {
        const { showSeconds = true } = options;

        /** Преобразуем входную дату в Date объект */
        let date;

        if (dateInput instanceof Date) {
            date = dateInput;
        } else if (typeof dateInput === 'string') {
            /** Убираем миллисекунды и временную зону для упрощения парсинга */
            const cleanedDate = dateInput
                .replace(/\.\d+/g, '')
                .replace(/[Z+].*$/, '')
                .replace('T', ' ');

            /** Пытаемся распарсить дату */
            date = new Date(cleanedDate + 'Z');

            /** Если не удалось, пробуем другие форматы */
            if (isNaN(date.getTime())) {
                date = new Date(dateInput);
            }
        } else {
            console.warn('Неверный формат даты');
            return '';
        }

        if (isNaN(date.getTime())) {
            console.warn('Неверная дата');
            return '';
        }

        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);
        const monthNames = [
            'янв', 'фев', 'мар', 'апр', 'май', 'июн',
            'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
        ];

        if (diffDays === 0) {

            if (showSeconds && diffSec < 60) {
                return `${diffSec} сек назад`;
            }

            if (diffMin < 60) {
                return `${diffMin} мин назад`;
            }

            return `${diffHours} ч назад`;
        }

        if (diffDays > 0 && diffDays < 7) {
            return `${diffDays} д назад`;
        }

        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Date
 */
export const InstanceMethodsDate = {

}
