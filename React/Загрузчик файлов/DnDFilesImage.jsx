/*** 26.09.2024 / DnDFiles.jsx from trial for UazFan project ***/

import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { upload, plus } from "@/Administrator/Components/Icons/Icons";

/**
 * Метод загрузки изображений обычным методом и Drag and Drop
 * @param name - Имя поле (обязательное должно быть уникальным при вызове нескольких компонентов)
 * @param maxSize - Максимальный размер файла в байтах по умолчанию 80мб
 * @param width - ширина блока дропа (необязательный параметр)
 * @param height - высота блока дропа (необязательный параметр)
 * @param icon - иконка в блоке дропа
 * @param label - подпись в блоке дропа
 * @param classes - классы для блока дропа
 * @param action - действие для заполнения результирующего объекта результатов в родительском компоненте
 * @param cache - формирование кеша файла для передачи его при реренденге обратно в компонент
 * @param cacheDataFile - Объект кэшированного файла из родительского компонента для автоматической подгрузки при повторном рендеринге
 * @param file - Объект файла new File для загрузки его в компоненте
 * @param store - каталог загрузки для передачи в форме
 * @param component - наименование компонента для удалённого запроса
 * @param handleDnDFiles - обработчик родительского компонента для фиксации данных
 * @param ref - реф для опроса данных компонента из родительского компонента
 * @returns {JSX.Element}
 * @constructor
 */
const DnDFilesImage = forwardRef((
    {
        name = false,
        maxSize = 8000000,
        width,
        height,
        icon = upload,
        label = false,
        classes = false,
        action = false,
        cache = false,
        cacheDataFile = false,
        file = false,
        store,
        component = 'N',
        handleDnDFiles
    }, ref) => {

    /**
     * Реф для опроса формы из родительского компонента
     */
    useImperativeHandle(ref, () => ({ uploadFormData }));

    /**
     * Флаг перемещения изображения в блоке
     * @type {boolean}
     */
    let drag = false;

    /**
     * Идентификатор главного блока
     * @type {string}
     */
    const idMainBlock = `main_drop_block_${name}`;

    /**
     * Реф содержит в себе переданный объект файла либо false
     * @type {React.MutableRefObject<boolean>}
     */
    const fileProp = useRef(file);

    /**
     * Состояние файла
     */
    const [objFileParams, setObjFileParams] = useState(() => {
        if(cacheDataFile && typeof cacheDataFile === 'object' && 'cache' in cacheDataFile){
            return {
                name: cacheDataFile.cache.name ?? '',
                width: cacheDataFile.cache.width ?? 0,
                height: cacheDataFile.cache.height ?? 0,
                imgUri: cacheDataFile.cache.imgUri ?? '',
                objRes: cacheDataFile.file ? {
                    fileObj: cacheDataFile.file,
                    height: cacheDataFile.height ?? 0,
                    width: cacheDataFile.width ?? 0,
                    size: cacheDataFile.size ?? 0,
                    contentType: cacheDataFile.contentType ?? '',
                    dropData: cacheDataFile.dropData ?? {}
                } : {}
            }
        } else {
            return {
                name: '',
                width: 0,
                height: 0,
                imgUri: '',
            }
        }
    });

    /**
     * Состояние ошибки
     */
    const [error, setError] = useState('');

    /**
     * Метод загрузки файла и его данных в результирующий объект
     * @param data
     * @param clear - флаг очистки
     */
    const uploadFormData = ({ clear = false }) => {
        if(!!action && !clear){
            if('objRes' in objFileParams && Object.keys(objFileParams.objRes).length > 0){
                let formData = {
                    'file': objFileParams.objRes.fileObj,
                    'store': store,
                    'component': component,
                    'height': objFileParams.objRes.height,
                    'width': objFileParams.objRes.width,
                    'size': objFileParams.objRes.size,
                    'dropData': objFileParams.objRes.dropData,
                    'contentType': objFileParams.objRes.contentType,
                    'cache': false
                }

                if(!!cache){
                    formData.cache = {
                        'name': objFileParams.name,
                        'imgUri': objFileParams.imgUri,
                        'width': objFileParams.width,
                        'height': objFileParams.height,
                    }
                }

                handleDnDFiles(action, {
                    form: formData
                });
            } else {
                handleDnDFiles(action, 'N');
            }

        } else if(!!action && !!clear){
            handleDnDFiles(action, 'N');
            setStateDropBlock('drop-open');
            setObjFileParams({
                ...objFileParams,
                name: '',
                width: 0,
                height: 0,
                imgUri: '',
                objRes: {}
            })
        } else {
            console.log('Ошибка. Не задано дейтсвия для загрузки файла в форму');
        }
    };

    /**
     * Зафиксировать положение картинки в блоке для обрезки в обработчике
     */
    const fixPosPicture = (top, left) => {
        setObjFileParams({
            ...objFileParams,
            objRes: {
                ...objFileParams.objRes,
                dropData: {
                    ...objFileParams.objRes.dropData,
                    top: top,
                    left:left
                }
            }
        });
    }

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

    /**
     * Перевод файла в строку байтов для вывода на экран
     * @param file
     * @returns {Promise<unknown>}
     */
    const imgToUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    });

    /**
     * Получить размеры загружаемой картинки
     * @param src
     * @returns {Promise<unknown>}
     */
    const getWHImage = (src) => new Promise((resolve, reject) => {
        const img =  document.createElement('img');
        img.src = src;
        img.onload = e => {
            resolve({widthImg: img.width, heightImg: img.height});
        }
    });

    /**
     * Проверка типа файла
     */
    const mimeList = ['image/jpeg', 'image/pjpeg', 'image/png']
    const checkFileType = (type) => {
        return mimeList.find(e => e === type);
    }

    /**
     * Обработчик загрузки файла в блок и состояние
     * @param file
     */
    const handleSetFile = (file) => {

        if(!file) {
            setError(`Ошибка загрузки файла`);
            setStateDropBlock('drop-error');
            return;
        }

        if(file.size > maxSize) {
            setError(`Размер файла не может быть более ${(maxSize / 1000000)}мб`);
            setStateDropBlock('drop-error');
            return;
        }

        if(!checkFileType(file.type)){
            setError(`Неверный тип файла. Загружать можно только .png либо .jpg/jpeg файлы`);
            setStateDropBlock('drop-error');
            return;
        }

        imgToUri(file)
            .then(
                imgUri => {
                    let mainBlock = document.getElementById(`main_drop_block_${name}`),
                        wBlock = mainBlock.clientWidth - 4,
                        hBlock = mainBlock.clientHeight - 4;
                    getWHImage(imgUri)
                        .then(data => {

                            let domWImg, domHImg, tempW, tempH;

                            if(data.widthImg > data.heightImg){
                                //Ширина больше высоты

                                tempH = hBlock;
                                tempW = (data.widthImg * hBlock) / data.heightImg;

                                if(tempW < wBlock){
                                    tempH = (data.heightImg * wBlock) / data.widthImg;
                                    tempW = wBlock;
                                }

                            } else if(data.widthImg < data.heightImg){
                                //Ширина меньше высоты

                                tempH = (data.heightImg * wBlock) / data.widthImg;
                                tempW = wBlock;

                                if(tempH < hBlock){
                                    tempH = hBlock;
                                    tempW = (data.widthImg * hBlock) / data.heightImg;
                                }

                            } else {
                                //Ширина равна высоте

                                if(wBlock > hBlock){
                                    tempW = wBlock;
                                    tempH = (data.heightImg * wBlock) / data.widthImg;
                                } else if(wBlock < hBlock){
                                    tempW = (data.widthImg * hBlock) / data.heightImg;
                                    tempH = hBlock;
                                } else {
                                    tempW = wBlock;
                                    tempH = hBlock;
                                }
                            }

                            domWImg = tempW ?? 0;
                            domHImg = tempH ?? 0;

                            setStateDropBlock('drop-succ');

                            setObjFileParams({
                                name: file.name,
                                width: domWImg,
                                height: domHImg,
                                imgUri: imgUri,
                                objRes: {
                                    fileObj: file,
                                    height: data.heightImg,
                                    width: data.widthImg,
                                    size: file.size,
                                    contentType: file.type,
                                    dropData: {
                                        domWImg: domWImg,
                                        domHImg: domHImg,
                                        wBlock: wBlock,
                                        hBlock: hBlock,
                                        top: 0,
                                        left: 0
                                    }
                                }
                            });

                        }, error => {
                            setError(error);
                            setStateDropBlock('drop-error');
                        });
                }
            );
    };

    /**
     * Если передан конкретный объект файла в компонент то передаём его загрузчику и чистим реф
     */
    if(fileProp.current){
        handleSetFile(fileProp.current);
        fileProp.current = false;
    }

    /**
     * Удаление файла из предпросмотра для нового выбора
     */
    const handleRemoveFile = () => {
        uploadFormData({ clear: true });
    };

    if(!!name){
        return (
            <div
                className={`flex flex-col ${classes ? classes : 'w-48 h-48'}`}
                style={{ width: width, height: height }}
            >
                <div
                    id={ idMainBlock }
                    className={`flex relative flex-col items-center justify-center border-dashed rounded-lg cursor-pointer h-full w-full ${ objFileParams.imgUri ? classStatList['drop-succ'].join(' ') : classStatList['drop-open'].join(' ') }`}
                    style={{ width: width, height: height }}
                    onDrop={(e) => {
                       e.preventDefault();
                       handleSetFile(e.dataTransfer.files[0]);
                    }}
                    onDragOver={(e) => {
                       e.preventDefault();
                       setStateDropBlock('drop-over');
                    }}
                    onDragLeave={(e) => {
                       e.preventDefault();
                       if(e.target === e.currentTarget)
                           setStateDropBlock('drop-open');
                    }}
                >
                    <>
                        {
                            !objFileParams.imgUri ?
                                (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400">{icon}</div>
                                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Перетащите файл</span>
                                        </p>
                                        <label
                                            htmlFor={`dropzone-file-${name}`}
                                            className="bg-[#b4cbf5] hover:bg-[#2f65b9] hover:text-white rounded-lg px-2 py-1 text-[#07142e] dark:text-white relative inline-block text-sm font-medium p-0">Выбрать
                                        </label>
                                        {
                                            label &&
                                            (<p className="text-[10px] text-gray-500 dark:text-gray-400">{label}</p>)
                                        }
                                        {
                                            error &&
                                            (<p className="text-[10px] leading-[10px] text-center text-red-500 dark:text-red-400">{error}</p>)
                                        }
                                    </div>
                                )
                            :
                                (
                                    <>
                                        <div
                                            onClick={ handleRemoveFile }
                                            className="absolute -top-[18px] -right-[18px] w-8 h-8 bg-red-400 hover:bg-red-800 rounded-full rotate-45 text-white z-20"
                                        >
                                            { plus }
                                        </div>
                                        <div
                                            className="overflow-hidden rounded-lg w-full z-0 relative"
                                            onClick={ (e) => e.stopPropagation() }
                                        >
                                            <div className="pointer-events-none graph-paper"></div>
                                            <img
                                                className="block relative select-none cursor-move max-w-none z-10"
                                                draggable={ false }
                                                src={ objFileParams.imgUri }
                                                width={ objFileParams.width }
                                                height={ objFileParams.height }
                                                style={{
                                                    'top': objFileParams.objRes.dropData.top ?? 0,
                                                    'left' : objFileParams.objRes.dropData.left ?? 0
                                                }}
                                                alt={ objFileParams.name }
                                                onClick={ (e) => e.stopPropagation() }
                                                onMouseDown={ () => {
                                                        //Курсор над областью с нажатой левой кнопкой
                                                        drag = true;
                                                    }
                                                }
                                                onMouseUp={ (e) => {
                                                        //Курсор над областью кнопка отжата
                                                        drag = false;

                                                        fixPosPicture(
                                                            e.target.style.top ?? 0,
                                                            e.target.style.left ?? 0
                                                        );
                                                    }
                                                }
                                                onMouseOut={ (e) => {
                                                        //Курсор покинул область
                                                        drag = false;

                                                        e.target.dataset.startX = 0;
                                                        e.target.dataset.startY = 0;

                                                        fixPosPicture(
                                                            e.target.style.top ?? 0,
                                                            e.target.style.left ?? 0
                                                        );
                                                    }
                                                }
                                                onMouseMove={ (e) => {
                                                    //Курсор перемещается над областью
                                                        e.preventDefault();
                                                        if(drag){
                                                            let left = parseInt(e.target.style.left) || 0,
                                                                top = parseInt(e.target.style.top) || 0,
                                                                newLeft = left + (e.clientX - (e.target.dataset.startX || e.clientX)),
                                                                newTop  = top + (e.clientY - (e.target.dataset.startY || e.clientY)),
                                                                parentHeight = e.target.parentNode.clientHeight,
                                                                parentWidth = e.target.parentNode.clientWidth,
                                                                imgHeight = e.target.clientHeight,
                                                                imgWidth = e.target.clientWidth;

                                                            e.target.style.left = (newLeft < 0 && (Math.abs(newLeft - parentWidth) < imgWidth) ? newLeft : left)+'px';
                                                            e.target.style.top = (newTop < 0 && (Math.abs(newTop - parentHeight) < imgHeight) ? newTop : top)+'px';

                                                            e.target.dataset.startX = e.clientX;
                                                            e.target.dataset.startY = e.clientY;

                                                        }
                                                    }
                                                }
                                            />
                                        </div>
                                    </>
                                )
                        }
                    </>
                    <input
                        id={`dropzone-file-${name}`}
                        type="file"
                        className="hidden"
                        name={ name }
                        accept=".jpg,.jpeg,.png"
                        onChange={
                            (e) => {
                                handleSetFile(e.target.files[0]);
                                e.target.value = '';
                            }
                        }
                    />
                </div>
            </div>
        );
    } else {
        return ( <p className="text-red-500 font-semibold">Ошибка компонента. Задайте "name" в параметрах</p> );
    }
});

export default DnDFilesImage;
