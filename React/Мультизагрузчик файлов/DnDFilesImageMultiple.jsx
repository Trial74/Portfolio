/*** 09.12.2025 / DnDFilesImageMultiple.jsx from trial for UazFan project ***/

import {useState, useRef, useCallback, useImperativeHandle, forwardRef} from 'react';
import { upload, carousel, grid, menuOpen, check, close } from "@/Administrator/Components/Icons/Icons";

/**
 * Метод загрузки нескольких изображений обычным методом и Drag and Drop
 * @param name - Имя поле (обязательное должно быть уникальным при вызове нескольких компонентов)
 * @param maxSize - Максимальный размер файла в байтах по умолчанию 30мб
 * @param countFiles - максимальное количество файлов допустимых для загрузки (по умолчанию 10)
 * @param width - ширина блока дропа (необязательный параметр)
 * @param height - высота блока дропа (необязательный параметр)
 * @param icon - иконка в блоке дропа
 * @param label - подпись в блоке дропа
 * @param classes - классы для блока дропа
 * @param action - действие для заполнения результирующего объекта результатов в родительском компоненте
 * @param files - Объект файла(ов) new File для загрузки его в компоненте
 * @param handleDnDFiles - обработчик родительского компонента для фиксации данных
 * @param ref - реф для опроса данных компонента из родительского компонента
 * @returns {JSX.Element}
 * @constructor
 */
const DnDFilesImageMultiple = forwardRef( (
    {
        name = '',
        maxSize = 30000000,
        countFiles = 10,
        width,
        height,
        icon = upload,
        label,
        classes = false,
        action,
        files,
        handleDnDFiles,
        disable = false
    }, ref) => {

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [typePrev, setTypePrev] = useState('grid');
    const fileInputRef = useRef(null);
    const [isMenuPrevOpen, setIsMenuPrevOpen] = useState(false);

    /**
     * Реф для опроса формы из родительского компонента
     */
    useImperativeHandle(ref, () => ({ uploadFormData }));

    /**
     * Метод загрузки файла(ов) и его(их) из родительского компонента
     */
    const uploadFormData = () => {

        return images;
    }

    /**
     * Идентификатор главного блока
     * @type {string}
     */
    const idMainBlock = `main_drop_block_${name}`;
    /**
     * Состояния блока:
     *
     * drop-open - состояние по уолчанию ('border-gray-300', 'dark:border-gray-600', 'bg-gray-50', 'border-2', 'drop-open')
     * drop-over - файл над блоком ('border-blue-800', 'dark:border-blue-600', 'bg-blue-100', 'border-4', 'drop-over')
     * drop-error - ошибка загрузки файла ('border-red-800', 'dark:border-red-600', 'bg-red-100', 'border-4', 'drop-error')
     * drop-succ - файл перемещён в блок ('border-green-800', 'dark:border-green-600', 'bg-green-100', 'border-4', 'drop-succ')
     *
     */
    const classStatList = {
        'drop-open': ['border-gray-300','hover:border-gray-400','dark:border-gray-600','dark:hover:border-gray-500','bg-gray-50','hover:bg-gray-100','dark:bg-gray-700','dark:hover:bg-gray-800','border-2','drop-open'],

        'drop-disable': ['border-gray-300','dark:border-gray-600','bg-gray-50','dark:bg-gray-700','border-2','opacity-50','cursor-not-allowed','drop-disable'],

        'drop-over': ['border-blue-300','hover:border-blue-400','dark:border-blue-600','dark:hover:border-blue-500','bg-blue-50','hover:bg-blue-100','dark:bg-blue-700','dark:hover:bg-blue-800','border-4','drop-over'],

        'drop-error': ['border-red-300','hover:border-red-400','dark:border-red-600','dark:hover:border-red-500','bg-red-50','hover:bg-red-100','dark:bg-red-700','dark:hover:bg-red-800','border-4','drop-error'],

        'drop-succ': ['border-green-300','hover:border-green-400','dark:border-green-600','dark:hover:border-green-500','bg-green-50','hover:bg-green-100','dark:bg-green-700','dark:hover:bg-green-800','border-4','drop-succ']
    }

    const setStateDropBlock = (state) => {
        let mainBlock = document.getElementById(idMainBlock);

        if(!mainBlock.classList.contains(state)){

            for(let key in classStatList) {
                if(mainBlock.classList.contains(key)){
                    mainBlock.classList.remove(...classStatList[key]);
                }
            }

            mainBlock.classList.add(...classStatList[state]);
        }
    };

    // Функция для добавления тестовой картинки
    const addTestImage = useCallback(() => {
        if (disable || images.length >= 10) return;

        const imageIndex = images.length;

        const newImage = {
            id: Date.now() + Math.random(),
            file: null, // Тестовый файл не загружается реально
            preview: testImageUrl,
            name: `test-image-${images.length + 1}.jpg`,
            size: (Math.random() * 2 + 1).toFixed(2), // Случайный размер 1-3 MB
            isTest: true // Флаг тестового изображения
        };

        setImages(prev => [...prev, newImage]);

        // Если добавляем 4-ю картинку, переходим на новый слайд
        if (images.length === 3) {
            setCurrentSlide(1);
        }
    }, [images, disable]);

    // Функция для обработки выбранных файлов
    const handleFiles = useCallback((files) => {
        if (disable) return;

        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/') && file.size <= maxSize
        );

        const newImages = validFiles.map(( file, index )  => ({
            index: index,
            objRes: {
                fileObj: file,
                size: file.size,
                contentType: file.type,
            },
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2)
        }));

        setImages(prev => [...prev, ...newImages].slice(0, countFiles));
    }, [disable]);

    // Обработчик выбора файлов через input
    const handleFileInput = (e) => {
        handleFiles(e.target.files);
        e.target.value = '';
    };

    // Обработчики Drag and Drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //setIsDragging(true);
        setStateDropBlock('drop-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //setIsDragging(false);
        if(e.target === e.currentTarget)
            setStateDropBlock('drop-open');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setStateDropBlock('drop-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        //setIsDragging(false);
        if (disable) return;

        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    };

    // Удаление изображения
    const removeImage = (id) => {
        if (disable) return;

        setImages(prev => {
            const imageToRemove = prev.find(img => img.index === id);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
            return prev.filter(img => img.index !== id);
        });

        // Корректировка текущего слайда после удаления
        if (typePrev === 'carousel') {
            const totalSlides = Math.ceil((images.length - 1) / 3);
            setCurrentSlide(prev => Math.min(prev, totalSlides - 1));
        }
    };

    // Очистка всех изображений
    const clearAll = () => {
        if (disable) return;

        images.forEach(img => URL.revokeObjectURL(img.preview));
        setImages([]);
        setCurrentSlide(0);
    };

    // Открытие проводника файлов
    const openFileExplorer = () => {
        fileInputRef.current?.click();
    };

    // Навигация по слайдам
    const nextSlide = () => {
        if (images.length <= 3) return;
        const totalSlides = Math.ceil(images.length / 3);
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        if (images.length <= 3) return;
        const totalSlides = Math.ceil(images.length / 3);
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Получение изображений для текущего слайда
    const getCurrentSlideImages = () => {
        if (images.length <= 3) return images;
        const start = currentSlide * 3;
        return images.slice(start, start + 3);
    };

    const openMenuTypePrev = () => {
        setIsMenuPrevOpen(prev => !prev);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsMenuPrevOpen(false);
        }, 500);
    };

    const handleMenuItemClick = (type) => {
        if(typePrev !== type && (type === 'grid' || type === 'carousel')){
            setTypePrev(type);
            setIsMenuPrevOpen(false);
        }
    };

    const getGridClasses = (index) => {
        const count = images.length;

        if (count === 1) {
            return "col-span-12";
        }

        if (count === 2) {
            return "col-span-6";
        }

        if (count === 3) {
            return "col-span-4";
        }

        if (count === 4) {
            return "col-span-6";
        }

        if (count === 5) {
            if (index < 2) return "col-span-6";
            return "col-span-4";
        }

        if (count === 6) {
            if (index < 2) return "col-span-6";
            return "col-span-3";
        }

        if(count === 7){
            if (index < 3) return "col-span-4";
            return "col-span-3";
        }

        if(count === 8){
            if (index < 4) return "col-span-3";
            return "col-span-3";
        }

        if(count === 9){
            if (index < 3) return "col-span-4";
            return "col-span-2";
        }

        if(count === 10){
            if (index < 4) return "col-span-3";
            return "col-span-2";
        }

    };

    return (
        <div className="relative">

            <div
                id={idMainBlock}
                className={`flex items-center bg-white border-dashed border-2 rounded-xl ${width ? '' : 'min-w-[490px] max-w-[620px]'} ${height ? '' : 'min-h-[412px]'} ${images.length > 0 ? classStatList['drop-succ'].join(' ') : (disable ? classStatList['drop-disable'].join(' ') : classStatList['drop-open'].join(' '))} ${images.length > 0 ? 'p-4' : 'p-8'} ${disable ? 'bg-gray-100 border-gray-200' : ''}`}
                style={{width: width, height: height}}
                onDragEnter={!disable ? handleDragEnter : undefined}
                onDragLeave={!disable ? handleDragLeave : undefined}
                onDragOver={!disable ? handleDragOver : undefined}
                onDrop={!disable ? handleDrop : undefined}
            >
                {/* Пустое состояние */}
                {images.length === 0 ? (
                    <div
                        className="w-full flex flex-col items-center justify-center cursor-pointer"
                        onClick={!disable ? openFileExplorer : undefined}
                    >
                        <div className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400">{icon}</div>
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Перетащите файл(ы)</span>
                        </p>
                        <label
                            className={`bg-[#b4cbf5] hover:bg-[#2f65b9] hover:text-white rounded-lg px-2 py-1 text-[#07142e] dark:text-white relative inline-block text-sm font-medium p-0 ${disable ? 'bg-gray-100 cursor-not-allowed' : ''}`}>Выбрать</label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span
                                className="font-semibold">До {countFiles} изображений, до {(maxSize / 1024 / 1024).toFixed(0)}MB каждое</span>
                        </p>
                    </div>
                ) : (
                    // Состояние с изображениями
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-gray-700 font-medium">
                                    Изображений: {images.length}/{countFiles}
                                </p>
                            </div>
                            <button
                                onClick={ clearAll }
                                disabled={ disable || images.length === 0 }
                                className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Очистить все
                            </button>
                        </div>
                        <div className="relative">
                            {typePrev === 'grid' ? (
                                <div className="grid grid-cols-12 gap-1">
                                    {images.map((img, index) => (
                                        <div
                                            key={img.index}
                                            className={`${getGridClasses(index)} transition-all duration-300`}
                                        >
                                            <ImageCard
                                                key={img.index}
                                                image={img}
                                                type={typePrev}
                                                onRemove={removeImage}
                                                disable={disable}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : typePrev === 'carousel' ? (
                                <div className="relative">
                                    {images.length > 3 && (
                                        <>
                                            <button
                                                onClick={prevSlide}
                                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M15 19l-7-7 7-7"/>
                                                </svg>
                                            </button>

                                            <button
                                                onClick={nextSlide}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    <div className="overflow-hidden">
                                        <div className="flex transition-transform duration-300">
                                            {Array.from({length: Math.ceil(images.length / 3)}).map((_, slideIndex) => {
                                                const slideImages = images.slice(slideIndex * 3, slideIndex * 3 + 3);
                                                return (
                                                    <div
                                                        key={slideIndex}
                                                        className="w-full flex-shrink-0"
                                                        style={{transform: `translateX(-${currentSlide * 100}%)`}}
                                                    >
                                                        <div
                                                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
                                                            {slideImages.map((img) => (
                                                                <ImageCard
                                                                    key={img.index}
                                                                    image={img}
                                                                    type={typePrev}
                                                                    onRemove={removeImage}
                                                                    disable={disable}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Индикаторы слайдов */}
                                    {images.length > 3 && (
                                        <div className="flex justify-center mt-4 space-x-2">
                                            {Array.from({length: Math.ceil(images.length / 3)}).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`w-2 h-2 rounded-full ${
                                                        index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : ''}
                        </div>
                        {disable && (
                            <div className="mt-4">
                                <div
                                    onMouseLeave={handleMouseLeave}
                                    className="relative"
                                >
                                    <div
                                        className={`flex items-center w-max gap-2 text-base px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md ${isMenuPrevOpen && 'bg-gray-100'}`}
                                        onClick={openMenuTypePrev}
                                    >
                                        <div className="flex items-center gap-2">
                                            {typePrev === 'grid' ? (
                                                <>
                                                    <div className="w-4 h-4">{grid}</div>
                                                    <span className="font-bold">Сетка</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-4 h-4">{carousel}</div>
                                                    <span className="font-bold">Карусель</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="w-4 h-4 rotate-90">
                                            {menuOpen}
                                        </div>
                                    </div>

                                    {/* Выпадающее меню */}
                                    {isMenuPrevOpen && (
                                        <div className="bg-white rounded-xl py-4 px-6 absolute top-10 left-0 shadow-xl">
                                            <ul className="flex flex-col list-none text-base">
                                                <li
                                                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleMenuItemClick('grid')}
                                                >
                                                    <div className="w-4 h-4">{grid}</div>
                                                    <span className="font-bold">Сетка</span>
                                                    {typePrev === 'grid' && (
                                                        <div className="w-4 h-4 ml-4 text-green-700">{check}</div>
                                                    )}
                                                </li>
                                                <li
                                                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleMenuItemClick('carousel')}
                                                >
                                                    <div className="w-4 h-4">{carousel}</div>
                                                    <span className="font-bold">Карусель</span>
                                                    {typePrev === 'carousel' && (
                                                        <div className="w-4 h-4 ml-4 text-green-700">{check}</div>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Зона для добавления новых файлов */}
                        {!disable && (
                            <div
                                className="mt-4 border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                                onClick={openFileExplorer}
                            >
                                <p className="text-gray-600 text-sm">
                                    + Добавить ещё изображений ({countFiles - images.length} осталось)
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <input
                    id={`dropzone-file-${name}`}
                    ref={fileInputRef}
                    name={name}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                />
            </div>
        </div>
    );
});

// Компонент карточки изображения
const ImageCard = ({image, onRemove, type, disable}) => {
    return (
        <div className="relative bg-gray-100 overflow-hidden">
            <div className="aspect-square relative">
                <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-full object-cover"
                />

                {/* Кнопка удаления */}
                {!disable && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(image.index);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white text-sm rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                        {close}
                    </button>
                )}
            </div>
            {type === 'carousel' && (
                <div className="p-2">
                    <p className="text-xs text-gray-600 truncate" title={image.name}>
                        {image.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {image.size} MB
                    </p>
                </div>
            )}
        </div>
    );
};

export default DnDFilesImageMultiple;
