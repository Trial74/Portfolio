/*** 11.11.2024 / Other.js from trial for UazFan project ***/

/**
 * Набор статических методов для Other
 */
export const StaticsMethodsOther = {
    /**
     * Возвращает имя файла с расширением из адреса файла
     * @param url
     * @returns {string}
     */
    getNameFileByUrl: (url) => {
        return decodeURI(url.split('/').pop());
    },

    /**
     * Устанавливает лоадер на кнопку и блочит её
     * @param btn
     * @param load
     */
    setBtnLoader: (btn, load = true) => {
        if(UF.isDOM(btn) && UF.hasClass(btn, 'btn')){
            if(load){
                btn.toggleAttribute('disabled');
                UF.addClass(btn, 'btn-load');
            } else {
                btn.toggleAttribute('disabled');
                UF.removeClass(btn, 'btn-load');
            }
        }
    },

    /**
     * Вычисляет оптимальные размеры модального окна для отображения изображений
     * @param {Array} images - Массив объектов с размерами изображений [{width, height}, ...]
     * @param {Object} options - Дополнительные параметры
     * @param {number} options.sidePanelWidth - Ширина боковой панели (по умолчанию 280px)
     * @param {number} options.bottomPanelHeight - Высота нижней панели (по умолчанию 50px)
     * @param {number} options.minMargin - Минимальный отступ от краев экрана (по умолчанию 20px)
     * @param {number} options.maxWidth - Максимальная ширина модального окна (по умолчанию 90% от экрана)
     * @param {number} options.maxHeight - Максимальная высота модального окна (по умолчанию 90% от экрана)
     * @returns {Object} Объект с вычисленными размерами {width, height}
     */
    calculateModalImagePostSize: (images, options = {}) => {
        const {
            sidePanelWidth = 310,
            bottomPanelHeight = 50,
            minMargin = 20,
            maxWidth = window.innerWidth * 0.9,
            maxHeight = window.innerHeight * 0.9
        } = options;

        // Если нет изображений, возвращаем минимальные размеры
        if (!images || images.length === 0) {
            return {
                width: sidePanelWidth + 400, // Минимальная ширина для контента
                height: 300
            };
        }

        // Находим максимальные размеры среди всех изображений
        let maxImageWidth = 0;
        let maxImageHeight = 0;

        images.forEach(image => {
            maxImageWidth = Math.max(maxImageWidth, image.width || 0);
            maxImageHeight = Math.max(maxImageHeight, image.height || 0);
        });

        // Рассчитываем общую ширину: контент + боковая панель + внутренние отступы
        const contentWidth = maxImageWidth;
        const totalWidth = contentWidth + sidePanelWidth + minMargin * 2;

        // Рассчитываем общую высоту: контент + нижняя панель + внутренние отступы
        const contentHeight = maxImageHeight;
        const totalHeight = contentHeight + bottomPanelHeight + minMargin * 2;

        // Получаем размеры доступной области экрана
        const availableWidth = maxWidth - minMargin * 2;
        const availableHeight = maxHeight - minMargin * 2;

        // Вычисляем оптимальные размеры с учетом ограничений
        let optimalWidth = Math.min(totalWidth, availableWidth);
        let optimalHeight = Math.min(totalHeight, availableHeight);

        // Проверяем пропорции и при необходимости корректируем
        // Если изображение слишком широкое для доступной ширины
        if (totalWidth > availableWidth) {
            const scaleFactor = (availableWidth - sidePanelWidth - minMargin * 2) / contentWidth;
            optimalHeight = Math.min(
                contentHeight * scaleFactor + bottomPanelHeight + minMargin * 2,
                availableHeight
            );
        }

        // Если изображение слишком высокое для доступной высоты
        if (totalHeight > availableHeight) {
            const scaleFactor = (availableHeight - bottomPanelHeight - minMargin * 2) / contentHeight;
            optimalWidth = Math.min(
                contentWidth * scaleFactor + sidePanelWidth + minMargin * 2,
                availableWidth
            );
        }

        // Гарантируем минимальные размеры
        const minWidth = sidePanelWidth + 200; // Минимальная ширина для контента
        const minHeight = bottomPanelHeight + 100; // Минимальная высота для контента

        optimalWidth = Math.max(optimalWidth, minWidth);
        optimalHeight = Math.max(optimalHeight, minHeight);

        // Округляем до целых пикселей
        return {
            width: Math.round(optimalWidth),
            height: Math.round(optimalHeight)
        };
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Other
 */
export const InstanceMethodsOther = {

}
