/*** 15.12.2025 / InputMessage.jsx from trial for UazFan project ***/

import {useRef, useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import EmojiPicker from "@emoji-mart/react";
import { smile } from "@/Administrator/Components/Icons/Icons";

const UFMessageInput = forwardRef(function UFMessageInput(props, ref) {
    const {
        value = '',
        placeholder = 'Введите сообщение...',
        maxHeight = 200,
        onChange,
        onSend,
        disabled = false,
        maxLength = 5000,
        enterBehavior = 'send',
        autoFocus = false,
        emoji = false,
        className = ''
    } = props;

    const [lengthText, setLengthText] = useState(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const editableRef = useRef(null);
    const lastValueRef = useRef('');

    // Инициализация значения
    useEffect(() => {
        if (editableRef.current && value !== undefined && value !== lastValueRef.current) {
            const cleaned = UF.getSecureText(value, {maxLength: maxLength});
            editableRef.current.textContent = cleaned;
            lastValueRef.current = cleaned;
            setLengthText(cleaned.length);
        }
    }, [value]);

    // Автофокус
    useEffect(() => {
        if (autoFocus && editableRef.current && !disabled) {
            editableRef.current.focus();
        }
    }, [autoFocus, disabled]);

    // Вставить текст в contenteditable
    const insertText = (text) => {
        const selection = window.getSelection();

        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // Перемещаем курсор после вставленного текста
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    // Обработчик ввода
    const handleInput = () => {
        const text = UF.getContentEditableNode(editableRef.current);

        setLengthText(text.length);

        // Проверка длины
        if (text.length > maxLength) {
            // Обрезаем текст
            const truncated = text.substring(0, maxLength);
            editableRef.current.innerText = truncated;

            // Восстанавливаем курсор в конец
            placeCursorAtEnd(editableRef.current);

            if (onChange) onChange(truncated);
            return;
        }

        if (onChange) onChange(text);
    };

    const handleBlur = () => {
        const text = UF.getContentEditableNode(editableRef.current);

        if(text.length > 0){
            editableRef.current.innerText = UF.getSecureText(text, { maxLength: maxLength });
        }
    }

    // Поместить курсор в конец элемента
    const placeCursorAtEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(element);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);
    };

    // Обработчик клавиш
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const text = UF.getContentEditableNode(editableRef.current);
            const trimmedText = text.trim();

            if (enterBehavior === 'send' && !e.shiftKey) {
                e.preventDefault();
                if (trimmedText && !disabled && onSend) {
                    onSend(trimmedText);
                }
                return;
            }

            if (enterBehavior === 'newline' && e.shiftKey) {
                e.preventDefault();
                if (trimmedText && !disabled && onSend) {
                    onSend(trimmedText);
                }
                return;
            }

            // Добавляем новую строку (нативный перенос)
            if (!disabled) {
                // Разрешаем нативный перенос строки
                // e.preventDefault() не вызываем
                setTimeout(handleInput, 0);
            }
        }
    };

    // Вставка из буфера
    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');

        // Очистка текста
        const cleanTextValue = UF.getSecureText(text, {maxLength: maxLength});
        insertText(cleanTextValue);
        setTimeout(handleInput, 0);
    };

    // Методы для рефа
    useImperativeHandle(ref, () => ({
        getValue: () => {
            if (!editableRef.current) return '';
            return UF.getContentEditableNode(editableRef.current);
        },
        setValue: (text) => {
            if (!editableRef.current) return;
            const cleaned = UF.getSecureText(text, {maxLength: maxLength});
            editableRef.current.innerText = cleaned;
            lastValueRef.current = cleaned;
            if (onChange) onChange(cleaned);
        },
        clear: () => {
            if (!editableRef.current) return;
            editableRef.current.innerText = '';
            lastValueRef.current = '';
            if (onChange) onChange('');
        },
        focus: () => {
            if (editableRef.current && !disabled) {
                editableRef.current.focus();
            }
        }
    }));

    const onEmojiClick = (emojiObject) => {
        setShowEmojiPicker(false);
        insertEmoji(emojiObject.native);
    };

    const insertEmoji = (emojiNative) => {
        if (!editableRef.current || !emojiNative) return;

        // Сохраняем состояние фокуса
        const wasFocused = document.activeElement === editableRef.current;

        // Получаем или создаем Range
        const selection = window.getSelection();
        let range;

        if (selection.rangeCount > 0) {
            // Получаем текущий Range
            range = selection.getRangeAt(0);

            // Проверяем, что Range внутри нашего элемента
            if (!editableRef.current.contains(range.commonAncestorContainer)) {
                // Range вне нашего элемента - создаем новый в конце
                range = document.createRange();
                range.selectNodeContents(editableRef.current);
                range.collapse(false);
            }
        } else {
            // Нет активного Range - создаем в конце элемента
            range = document.createRange();
            range.selectNodeContents(editableRef.current);
            range.collapse(false);
        }

        // Удаляем любой выделенный текст
        range.deleteContents();

        // Вставляем эмодзи
        const textNode = document.createTextNode(emojiNative);
        range.insertNode(textNode);

        // Перемещаем курсор сразу после вставленного эмодзи
        range.setStartAfter(textNode);
        range.collapse(true);

        // Обновляем выделение
        selection.removeAllRanges();
        selection.addRange(range);

        // Фокусируем элемент если нужно
        if (!wasFocused) {
            editableRef.current.focus();
        }

        // Обновляем состояние
        handleInput();
    };

    return (
        <>
            <div className={`relative flex flex-row items-start min-h-[100px] h-full ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-text'} ${className}`}>
                <div
                    ref={editableRef}
                    className={`outline-none text-base w-full h-full text-gray-900 dark:text-gray-100 overflow-y-auto whitespace-pre-wrap break-words ${disabled ? 'pointer-events-none' : ''}`}
                    contentEditable={!disabled}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onBlur={handleBlur}
                    style={{ maxHeight: `${maxHeight}px` }}
                    suppressContentEditableWarning
                />
                {lengthText === 0 && (
                    <div className="absolute top-0 left-1 text-gray-500 dark:text-gray-400 pointer-events-none select-none leading-none">
                        {placeholder}
                    </div>
                )}
                {emoji && (
                    <button
                        className="w-7 h-7 text-gray-400 hover:text-gray-800 cursor-pointer"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        { smile }
                    </button>
                )}
            </div>
            {emoji && showEmojiPicker && (
                <div className="absolute bottom-0 -translate-x-1/2 -right-full">
                    <EmojiPicker
                        onEmojiSelect={ onEmojiClick }
                        locale={ `ru` }
                        categories={['people']}
                        previewPosition={ `none` }
                        skinTonePosition={ `none` }
                        searchPosition={ `none` }
                    />
                </div>
            )}
        </>
    );
});

export default UFMessageInput;
