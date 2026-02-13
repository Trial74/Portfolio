<?php if( !defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true ) die();

/**
 * Входной шаблон компонента квиза
 * @global $APPLICATION
 * @global $component
 * @var $arResult
 * @var $arParams
 */

$obName = 'kv_'.preg_replace('/[^a-zA-Z0-9_]/', 'x', $this->GetEditAreaId($this->randString()));

$blocks = array(
    'MAIN_BLOCK' => 'main_'.$obName,
    'QUESTION_BLOCK' => 'question_block_'.$obName,
    'QUESTION_CONTENT' => 'question_content_'.$obName,
    'QUESTIONS' => 'kviz_question',
    'RESULTS' => 'kviz_question_result',
    'CLOSE_SIDER_BTN' => 'close_sider_'.$obName,
    'BACK_BTN' => 'back_'.$obName,
    'GO_SITE_BTN' => 'go_site_'.$obName,
    'RELOAD_SITE_BTN' => 'reload_site_'.$obName,
    'BLOCK_TOP_TITTLE' => 'block_title_'.$obName,
    'NEXT_BTN' => 'next_'.$obName,
    'NEXT_BTN_CALC' => 'next_cal_'.$obName,
    'NEXT_BTN_DATA' => 'next_data_'.$obName,
    'BLOCK_PRECENT' => 'block_precent_'.$obName,
    'BLOCK_PROGRESS' => 'block_progress_'.$obName,
    'BLOCK_BOTTOM' => 'block_bottom_'.$obName,
    'BLOCK_RECORDING' => 'block_recording_'.$obName,
    'BLOCK_DATA_USER' => 'block_data_user_'.$obName,
    'BLOCK_RESULT' => 'block_result_'.$obName,
    'BLOCK_ERROR' => 'block_error_'.$obName,
);?>

<div class="kviz_main_block" id="<?=$blocks['MAIN_BLOCK']?>">
    <div class="kmb_question" id="<?=$blocks['QUESTION_BLOCK']?>">
        <div class="kmb_question-top">
            <div class="qt-back" data-back="" id="<?=$blocks['BACK_BTN']?>"><span></span></div>
            <div class="qt-tittle" id="<?=$blocks['BLOCK_TOP_TITTLE']?>"></div>
            <div class="qt-close" id="<?=$blocks['CLOSE_SIDER_BTN']?>"></div>
        </div>
        <div class="kmb_question-content" id="<?=$blocks['QUESTION_CONTENT']?>"></div>
        <div class="kmb_question-bottom" id="<?=$blocks['BLOCK_BOTTOM']?>">
            <div class="qtb_progress">
                <div class="qtb_progress-precent" id="<?=$blocks['BLOCK_PRECENT']?>">Готово <span></span></div>
                <div class="qtb_progress-block">
                    <div class="qtb_progress-mask" id="<?=$blocks['BLOCK_PROGRESS']?>"></div>
                </div>
            </div>
            <div class="ld-button orange disabled" id="<?=$blocks['NEXT_BTN']?>">
                <div class="ld-button-lable-block arrow-next"><span>Далее</span></div>
            </div>
        </div>
    </div>

    <div class="kviz_question" data-qu="1">
        <div class="qu_order_num">Вопрос 1</div>
        <div class="qu_text">Как часто вы&nbsp;замечаете, что предметы вдали выглядят размытыми?</div>
        <div class="qu_answers">
            <div>
                <div>
                    <div>
                        <input type="radio" id="qu-1-1" name="Q-1" value="1" />
                        <label for="qu-1-1">Почти никогда</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-1-2" name="Q-1" value="2" />
                        <label for="qu-1-2">Иногда бывает</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-1-3" name="Q-1" value="3" />
                        <label for="qu-1-3">Часто</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="kviz_question" data-qu="2">
        <div class="qu_order_num">Вопрос 2</div>
        <div class="qu_text">Замечаете&nbsp;ли вы, что предметы на&nbsp;близких расстояниях кажутся размытыми?</div>
        <div class="qu_answers">
            <div>
                <div>
                    <div>
                        <input type="radio" id="qu-2-1" name="Q-2" value="1" />
                        <label for="qu-2-1">Почти никогда</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-2-2" name="Q-2" value="2" />
                        <label for="qu-2-2">Иногда бывает</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-2-3" name="Q-2" value="3" />
                        <label for="qu-2-3">Часто</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="kviz_question" data-qu="3">
        <div class="qu_order_num">Вопрос 3</div>
        <div class="qu_text">Замечали&nbsp;ли вы&nbsp;проблемы с&nbsp;различением некоторых цветов, например, красного и&nbsp;зеленого?</div>
        <div class="qu_answers">
            <div>
                <div>
                    <div>
                        <input type="radio" id="qu-3-1" name="Q-3" value="1" />
                        <label for="qu-3-1">Нет, все цвета различимы</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-3-2" name="Q-3" value="2" />
                        <label for="qu-3-2">Иногда бывает</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-3-3" name="Q-3" value="3" />
                        <label for="qu-3-3">Да, часто путаю</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="kviz_question" data-qu="4">
        <div class="qu_order_num">Вопрос 4</div>
        <div class="qu_text">Чувствуете&nbsp;ли вы&nbsp;усталость глаз после длительной работы за&nbsp;компьютером?</div>
        <div class="qu_answers">
            <div>
                <div>
                    <div>
                        <input type="radio" id="qu-4-1" name="Q-4" value="1" />
                        <label for="qu-4-1">Нет, чувствую себя нормально</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-4-2" name="Q-4" value="2" />
                        <label for="qu-4-2">Иногда бывает</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-4-3" name="Q-4" value="3" />
                        <label for="qu-4-3">Да, глаза быстро устают</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="kviz_question" data-qu="5">
        <div class="qu_order_num">Вопрос 5</div>
        <div class="qu_text">Когда вы&nbsp;в&nbsp;последний раз проверяли зрение у&nbsp;специалиста?</div>
        <div class="qu_answers">
            <div>
                <div>
                    <div>
                        <input type="radio" id="qu-5-1" name="Q-5" value="1" />
                        <label for="qu-5-1">Проверял недавно</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-5-2" name="Q-5" value="2" />
                        <label for="qu-5-2">Проверял 1-3 года назад</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="qu-5-3" name="Q-5" value="3" />
                        <label for="qu-5-3">Не помню когда</label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="kviz_question_result" data-res="1">
        <img src="/images/landing/kviz/images/result_kviz_1.png" alt="Ваше зрение, в отличном состоянии">
        <div class="qr_tittle">Ваше зрение, похоже, в&nbsp;отличном состоянии!</div>
        <div class="qr_sub_tittle">Для уверенности в&nbsp;здоровье ваших глаз рекомендуем посетить специалиста и&nbsp;пройти <span class="black">бесплатную диагностику</span>
        </div>
        <div class="ld-button orange arrow-right w-100 box btn_recording">
            <div class="ld-button-lable-block">
                <span>Записаться на&nbsp;прием</span>
                <span>Выберите дату и&nbsp;время</span>
            </div>
        </div>
        <div class="qr_sub_tittle sp_orange center">Получите <span>скидку&nbsp;10%</span> после проверки зрения</div>
        <div class="ld-button gray w-100 h-52 box link_telegram">
            <div class="ld-button-lable-block i-telegram">
                <span>Следите за&nbsp;нами в&nbsp;Telegram</span>
            </div>
        </div>
        <div class="kviz_question_result-bottom_btn-bl">
            <a onclick="ym(102969881,'reachGoal','catalog-lend')" href="/catalog/" class="ld-button gray w-100 h-52 box">
                <div class="ld-button-lable-block arrow-up-right_black">
                    <span>Перейти в&nbsp;каталог</span>
                </div>
            </a>
        </div>
    </div>
    <div class="kviz_question_result" data-res="2">
        <img src="/images/landing/kviz/images/result_kviz_2.png" alt="Ваше зрение заслуживает внимания">
        <div class="qr_tittle">Ваше зрение заслуживает внимания:</div>
        <div class="qr_sub_tittle">Возможно, у&nbsp;вас есть некоторые нарушения зрения. Рекомендуем посетить специалиста и&nbsp;пройти <span class="black">бесплатную диагностику</span>
        </div>
        <div class="ld-button orange arrow-right w-100 box btn_recording">
            <div class="ld-button-lable-block">
                <span>Записаться на&nbsp;прием</span>
                <span>Выберите дату и&nbsp;время</span>
            </div>
        </div>
        <div class="qr_sub_tittle sp_orange center">Получите <span>скидку&nbsp;10%</span> после проверки зрения</div>
        <div class="ld-button gray w-100 h-52 box link_telegram">
            <div class="ld-button-lable-block i-telegram">
                <span>Следите за&nbsp;нами в&nbsp;Telegram</span>
            </div>
        </div>
        <div class="kviz_question_result-bottom_btn-bl">
            <a onclick="ym(102969881,'reachGoal','catalog-lend')" href="/catalog/" class="ld-button gray w-100 h-52 box">
                <div class="ld-button-lable-block arrow-up-right_black">
                    <span>Перейти в&nbsp;каталог</span>
                </div>
            </a>
        </div>
    </div>

    <div class="kviz_recording" id="<?=$blocks['BLOCK_RECORDING']?>">
        <div class="kviz_recording-office">
            <div class="kviz_recording-office-tittle">Выберите офис</div>
            <?php
            global $officeFilterByKviz;
            $officeFilterByKviz = array('ID' => array('10323'));
            $APPLICATION->IncludeComponent(
                "bitrix:news.list",
                "offices_tizer",
                Array(
                    'IBLOCK_TYPE' => 'content',
                    'IBLOCK_ID' => '11',
                    'PROPERTY_CODE' => array(
                        'ADDRESS',
                        'METRO'
                    ),
                    'FILTER_NAME' => 'officeFilterByKviz',
                    "CACHE_TYPE" => "N",
                ),
                false
            );?>
        </div>
        <div class="kviz_recording-date">
            <div class="kviz_recording-date-tittle">Выберите дату</div>
            <div class="kviz_recording-dates">
                <?php foreach($arResult['DATES_CALENDAR'] as $keyD => $date){
                    if($keyD < 6){
                        $arResult['DATES_CALENDAR'][$keyD]['ADDED'] = 'Y'?>
                        <div
                            class="recording-date"
                            data-ev="date"
                            data-stamp="<?=$date['TIMESTAMP']?>"
                            data-today="<?=$date['TODAY']?>"
                        >
                            <span><?=$date['DATE_FORMAT']?></span>
                        </div>
                    <?php } else {?>
                        <div class="recording-date" data-ev="more-date">
                            <span>Ещё..</span>
                        </div>
                        <?php break;}?>
                <?php }?>
            </div>
        </div>
        <div class="kviz_recording-time">
            <div class="kviz_recording-time-tittle">Выберите время</div>
            <div class="kviz_recording-times">
                <?php $countTime = 0;
                foreach($arResult['TIMES_CALENDAR'] as $keyT => $time){
                    if($countTime < 8){
                        if($time['BACK'] !== 'Y'){
                            $countTime++;
                        }
                        $arResult['TIMES_CALENDAR'][$keyT]['ADDED'] = 'Y'?>
                        <div
                            class="recording-time"
                            data-ev="time"
                            data-stamp="<?=$time['TIMESTAMP']?>"
                            data-back="<?=$time['BACK']?>"
                            style="display:<?=$time['BACK'] === 'Y' ? 'none' : 'flex' ?>"
                        >
                            <span><?=$time['TIME_FORMAT']?></span>
                        </div>
                    <?php } else {?>
                        <div class="recording-time" data-ev="more-time">
                            <span>Ещё..</span>
                        </div>
                        <?php break;}?>
                <?php }?>
            </div>
        </div>
        <div class="kviz_recording_bottom">
            <div class="ld-button orange arrow-next w-100 h-55 box disabled" id="<?=$blocks['NEXT_BTN_CALC']?>">
                <div class="ld-button-lable-block">
                    <span>Продолжить</span>
                </div>
            </div>
        </div>
    </div>

    <div class="kviz_data_user" id="<?=$blocks['BLOCK_DATA_USER']?>">
        <form>
            <div class="data_user-block_input">
                <label for="data_user_name">Ваше имя:<span class="star">*</span></label>
                <input
                        type="text"
                        id="data_user_name"
                        placeholder="Введите имя"
                        name="KVIZ_NAME"
                        data-name="DATA_USER"
                />
            </div>
            <div class="data_user-block_input">
                <label for="data_user_tel">Телефон:<span class="star">*</span></label>
                <input
                        type="text"
                        inputmode="numeric"
                        id="data_user_tel"
                        placeholder="Введите номер телефона"
                        name="KVIZ_TEL"
                        data-name="DATA_USER"
                />
            </div>
            <div class="data_user-block_input">
                <label for="data_user_comment">Комментарий:</label>
                <textarea
                        rows="5"
                        cols="33"
                        autocomplete="off"
                        maxlength="300"
                        spellcheck="true"
                        id="data_user_comment"
                        placeholder="Комментарий к записи"
                        name="KVIZ_COMMENT"
                        data-name="DATA_USER"
                ></textarea>
            </div>
            <div class="data_user-politica">
                <input
                        type="checkbox"
                        name="KVIZ_POLITICA"
                        data-name="DATA_USER"
                        id="user-politica"
                />
                <label for="user-politica">Я&nbsp;предоставляю согласие на&nbsp;обработку персональных данных, а&nbsp;также подтверждаю ознакомление и&nbsp;согласие с&nbsp;<a target="_blank" href="https://refaced.ru/info/politica/">Политикой конфиденциальности</a></label>
            </div>
            <div class="kviz_data_user_bottom">
                <div class="ld-button orange arrow-next w-100 box disabled" id="<?=$blocks['NEXT_BTN_DATA']?>">
                    <div class="ld-button-lable-block">
                        <span>Продолжить</span>
                        <span class="date_tittle"></span>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="kviz_result_block" id="<?=$blocks['BLOCK_RESULT']?>">
        <div class="kviz_result_suc-icon"></div>
        <div class="kviz_result-mess">Вы&nbsp;успешно записались на&nbsp;прием!</div>
        <div class="kviz_result-submess">Ждем вас в&nbsp;офисе, после приема мы&nbsp;дадим вам скидку&nbsp;10% на&nbsp;линзы или оправы</div>
        <div class="kviz_result-office">
            <div class="kviz_result-office-sub-tittle">
                <label>
                    <span class="kviz_office_address"></span>
                    <div class="kviz_office_metro-block"></div>
                </label>
            </div>
        </div>
        <div class="kviz-result_recording">
            <div class="recording-date">
                <span></span>
            </div>
            <div class="recording-time">
                <span></span>
            </div>
        </div>
        <div class="ld-button gray w-100 h-52 box add_calendar">
            <div class="ld-button-lable-block plus">
                <span>Добавить запись в&nbsp;календарь</span>
            </div>
        </div>
        <div class="ld-button gray w-100 h-52 box link_telegram">
            <div class="ld-button-lable-block i-telegram">
                <span>Следите за&nbsp;нами в&nbsp;Telegram</span>
            </div>
        </div>

        <div class="kviz_result_bottom">
            <a onclick="ym(102969881,'reachGoal','catalog-lend')" href="/catalog/" class="ld-button orange h-52 w-100 box">
                <div class="ld-button-lable-block arrow-left">
                    <span>Перейти в&nbsp;каталог</span>
                </div>
            </a>
        </div>
    </div>
    <div class="kviz_result_block" id="<?=$blocks['BLOCK_ERROR']?>">
        <div class="kviz_result_err-icon"></div>
        <div class="kviz_result-mess">Что-то пошло не так</div>
        <div class="kviz_result-submess">Обновите страницу</div>

        <div class="kviz_result_bottom">
            <div class="ld-button orange h-52 w-100 box" id="<?=$blocks['RELOAD_SITE_BTN']?>">
                <div class="ld-button-lable-block reload">
                    <span>Обновить страницу</span>
                </div>
            </div>
        </div>
    </div>

</div>

<script type="text/javascript">
    var <?=$obName?> = new KvizHandler({
        blocks: <?=CUtil::PhpToJSObject($blocks)?>,
        dates: <?=CUtil::PhpToJSObject($arResult['DATES_CALENDAR'])?>,
        times: <?=CUtil::PhpToJSObject($arResult['TIMES_CALENDAR'])?>,
        type: '<?=$arParams['TYPE']?>'
    });
</script>