<?php if( !defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true ) die();
require_once $_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/items_lending/include/selection_items.php';
$itLand = false;
if(!empty($selection_items) && is_array($selection_items)){
    $itLand = true;
}
?>

<div class="con_top_banner digit-t-left">
    <img class="desc-block" src="/images/landing/content/top_banner.png?29052025" alt="Четкое зрение — важнее, чем кажется">
    <img class="mobile-block" src="/images/landing/content/top_banner_mobile.png?29052025" alt="Четкое зрение — важнее, чем кажется">
</div>

<div class="con_block_f">
    <div class="con_block_f-left digit-t-left">
        <!--<div class="f-left-top">Четкое зрение&nbsp;&mdash; важнее, чем кажется</div>-->
		<h1 class="f-left-top">Проверка зрения <br>в Санкт-Петербурге</h1>
        <div class="f-left-bottom">
            <span>Простая процедура за&nbsp;15&nbsp;минут</span>
        </div>
    </div>
    <div class="con_block_f-right digit-t-right">
        <div class="f-right-top">Запишитесь на&nbsp;бесплатную диагностику зрения у&nbsp;эксперта Refaced</div>
        <div class="f-right-bottom">
            <div class="ld-button orange arrow-right btn-fixed" data-event="signup" data-data="recording">
                <div class="ld-button-lable-block">
                    <span>Записаться на&nbsp;проверку зрения</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="con_block_s digit-t-down" id="my-sticky-element">
    <h2>Немного статистики</h2>
    <div id="con_block_s-owl" class="con_block_s-content owl-carousel owl-theme">
        <div class="con_block_s-content-item item">
            <div class="con_block_s-item-pic">
                <img src="/images/landing/content/block_s-content-item-1.png?29052025" alt="Проблемы со зрением у школьников">
            </div>
            <div class="con_block_s-item-description">
                <span class="con_block_s-item-desc-big-blue">&asymp;25%</span>
                <span class="con_block_s-item-desc-text">Около&nbsp;25% школьников имеют проблемы со&nbsp;зрением, которые могут повлиять на&nbsp;их&nbsp;успеваемость и&nbsp;повседневную жизнь</span>
            </div>
        </div>
        <div class="con_block_s-content-item item">
            <div class="con_block_s-item-pic">
                <img src="/images/landing/content/block_s-content-item-2.png?29052025" alt="Проблемы со зрением у школьников">
            </div>
            <div class="con_block_s-item-description">
                <span class="con_block_s-item-desc-big-blue">&asymp;50%</span>
                <span class="con_block_s-item-desc-text">Исследования показывают, что примерно&nbsp;50% людей не&nbsp;проходят регулярные проверки зрения, считая, что их&nbsp;зрение в&nbsp;порядке, если они не&nbsp;испытывают явных симптомов</span>
            </div>
        </div>
        <div class="con_block_s-content-item item">
            <div class="con_block_s-item-pic">
                <img src="/images/landing/content/block_s-content-item-3.png?29052025" alt="Проблемы со зрением у школьников">
            </div>
            <div class="con_block_s-item-description">
                <span class="con_block_s-item-desc-big-blue">&asymp;75%</span>
                <span class="con_block_s-item-desc-text">Около&nbsp;75% взрослого населения страдает от&nbsp;различных форм проблем со&nbsp;зрением, включая близорукость, дальнозоркость, астигматизм и&nbsp;пресбиопию</span>
            </div>
        </div>
    </div>
</div>

<div class="con_block_t">
    <div class="block_t_img-block digit-t-left">
        <img src="/images/landing/content/block_t-img.png?29052025" alt="Преимущества проверки зрения в Refaced">
    </div>
    <div class="block_t_description digit-t-left">
        <h2>Преимущества проверки зрения в&nbsp;Refaced</h2>
        <div class="block_t_list">
            <div class="block_t_list-item">
                <span>Современное оборудование и&nbsp;точная диагностика.</span>
            </div>
            <div class="block_t_list-item">
                <span>Врачи-оптометристы с&nbsp;опытом более 10&nbsp;лет.</span>
            </div>
            <div class="block_t_list-item">
                <span>Индивидуальный подход и&nbsp;рекомендации по&nbsp;коррекции.</span>
            </div>
        </div>
    </div>
</div>

<div class="con_block_fo">
    <h2 class="desc-flex digit-t-left">Как проходит проверка зрения?</h2>
    <div class="block_fo-content">
        <div class="block_fo-content-left digit-t-left">
            <div id="block_fo-content-id" class="block_fo-content-left-text">
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Сбор информации:</h3>
                        <span class="text-item-description">В&nbsp;начале визита вам зададут несколько вопросов о&nbsp;текущих симптомах и&nbsp;любых проблемах со&nbsp;зрением, общем состоянии здоровья, истории заболеваний глаз,перенесенных операциях, приеме медикаментов и&nbsp;другое. Оптометрист определит оптическую силу, межзрачковое расстояние и&nbsp;дизайн линз в&nbsp;очках, которыми вы&nbsp;пользуетесь.</span>
                    </div>
                </div>
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Тест на&nbsp;остроту зрения вдаль:</h3>
                        <span class="text-item-description">Это классический тест, при котором вы&nbsp;смотрите на&nbsp;таблицу Сивцева с&nbsp;буквами разного размера на&nbsp;определенном расстоянии. Закрыв один глаз заслонкой, оптометрист попросит вас прочитать самые маленькие буквы в&nbsp;таблице, которые вы&nbsp;можете видеть, чтобы оценить остроту зрения для каждого глаза.</span>
                    </div>
                </div>
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Тест на&nbsp;остроту зрения вблизи:</h3>
                        <span class="text-item-description">При проведении теста необходимо взять таблицу с&nbsp;текстами разного размера и&nbsp;держать ее&nbsp;на&nbsp;удобном для вас расстоянии при чтении. Острота зрения определяется по&nbsp;самому маленькому тексту, который вы&nbsp;видете и&nbsp;свободно читаете.</span>
                    </div>
                </div>
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Рефракционный тест:</h3>
                        <span class="text-item-description">Этот тест помогает определить, есть&nbsp;ли у&nbsp;вас близорукость, дальнозоркость или астигматизм. Оптометрист использует авторефрактометр, чтобы измерить показатель фокусировки светового луча на&nbsp;сетчатке и&nbsp;подобрать необходимые линзы для коррекции вашего зрения.</span>
                    </div>
                </div>
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Подбор очковой коррекции вдаль/вблизь:</h3>
                        <span class="text-item-description">При помощи линейки или пупиллометра измеряют межзрачковое расстояние, для правильной установки линз. Вы&nbsp;надеваете пробную оправу, закрывав левый глаз, правым вы&nbsp;читаете строчки на&nbsp;таблице, оптометрист устанавливает линзы разной силы, пока острота зрения не&nbsp;становится максимальной на&nbsp;обоих глазах. После чего оценивается комфорт в&nbsp;пробных очках и&nbsp;делается корректировка с&nbsp;учетом индивидуальной переносимости.</span>
                    </div>
                </div>
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Подбор коррекция вблизи:</h3>
                        <span class="text-item-description">В&nbsp;корреции для дали вы&nbsp;читаете таблицу для близи, оптометрист при помощи линз делает корректировку, пока острота зрения не&nbsp;становится максимально комфортной для чтения</span>
                    </div>
                </div>
                <div class="block_fo-content-left-text-item">
                    <div class="text-item-block">
                        <h3>Рекомендации по&nbsp;линзам:</h3>
                        <span class="text-item-description">Оптометрист подбирает тип, дизайн и&nbsp;покрытия линз, которые лучше всего подойдут для комфорта вашего зрения, исходя из&nbsp;данных рецепта,посадки оправы, ваших потребностей и&nbsp;образа жизни.</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="block_fo-tittle mobile-flex digit-t-left">Как проходит проверка?</div>
        <div class="block_fo-content-right digit-t-right">
            <img class="desc-block" src="/images/landing/content/block_fo-content-right.png?29052025" alt="Как происходит проверка">
            <img class="mobile-block" src="/images/landing/content/block_fo-content-right_mobile.png?29052025" alt="Как происходит проверка">
        </div>
    </div>
</div>

<div class="con_block_t second">
    <div class="block_t_img-block digit-t-right">
        <img src="/images/landing/content/block_t-img-second.png?29052025" alt="После приёма">
    </div>
    <div class="block_t_description digit-t-left">
        <h2>После приема оптометриста:</h2>
        <div class="block_t_list">
            <div class="block_t_list-item">
                <span>Подберем для вас линзы по&nbsp;рецепту</span>
            </div>
            <div class="block_t_list-item">
                <span>Стилисты&nbsp;&mdash; консультанты помогут выбрать оправу, если потребуется</span>
            </div>
            <div class="block_t_list-item">
                <span>Результаты исследования выдаём на&nbsp;руки, а&nbsp;также сохраняем в&nbsp;системе Refaced.</span>
            </div>
        </div>
    </div>
</div>

<div class="con_block_fi">
    <div class="con_block_fi-left digit-t-left">
        <div class="con_block_fi-left_top-img">
            <img class="desc-block" src="/images/landing/content/con_block_fi-left-img.png" alt="Пройдите опрос">
            <img class="mobile-block" src="/images/landing/content/con_block_fi-left-img_mobile.png" alt="Пройдите опрос">
        </div>
        <div class="con_block_fi-left-bottom">
            <div class="con_block_fi-left-bottom-sescription">
                <span class="fi-left-bottom-sescription-tittle">Пройдите опрос из&nbsp;5&nbsp;вопросов <span>о&nbsp;здоровье ваших глаз</span></span>
                <span class="fi-left-bottom-sescription-value">Регулярная проверка зрения поможет вам сохранить его остроту и&nbsp;здоровье на&nbsp;долгие годы.</span>
            </div>
            <div class="ld-button orange arrow-right w-60" data-event="signup" data-data="kviz">
                <div class="ld-button-lable-block">
                    <span>Проверить зрение</span>
                    <span>5&nbsp;вопросов о&nbsp;здоровье глаз</span>
                </div>
            </div>
        </div>
    </div>
    <div class="con_block_fi-right digit-t-right">
        <div class="con_block_fi-right_top-img">
            <img class="desc-block" src="/images/landing/content/con_block_fi-right-img.png?29052025" alt="Получите скидку 10%">
            <img class="mobile-block" src="/images/landing/content/con_block_fi-right-img_mobile.png" alt="Получите скидку 10%">
        </div>
        <div class="con_block_fi-right-bottom">
            <div class="con_block_fi-right-bottom-sescription">
                <span class="fi-right-bottom-sescription-tittle"><a target="_blank" href="/catalog/">Получите скидку&nbsp;10%</a> <span>после бесплатной проверки зрения на&nbsp;линзы или оправы</span></span>
                <div class="fi-right-bottom-frame">Предложение действует еще 7&nbsp;дней</div>
                <span class="fi-right-bottom-sescription-value">Регулярная проверка зрения поможет вам сохранить его остроту и&nbsp;здоровье на&nbsp;долгие годы.</span>
            </div>
            <div class="ld-button orange arrow-right w-60" data-event="signup" data-data="recording">
                <div class="ld-button-lable-block">
                    <span>Записаться на&nbsp;проверку</span>
                    <span>Без прохождения теста</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="con_block_rew_mobile mobile-flex digit-t-left">
    <h3>Отзывы наших клиентов:</h3>
    <div class="con_block_rew-widget_block">
        <iframe src="https://yandex.ru/maps-reviews-widget/1290401932?comments"></iframe>
        <div class="iframe-overlay top"></div>
        <div class="iframe-overlay content"></div>
    </div>
</div>

<?php if($itLand){?>
<div class="con_block_si_pr">
    <h3 class="digit-t-left">Каталог</h3>
    <div class="block_fi-content">
        <?php
        global $arLandFilter;
        $arLandFilter = array(
            'ID' => array(),
            "CATALOG_AVAILABLE" => "Y",
            ">CATALOG_QUANTITY" => 0,
            "ACTIVE" => "Y",
        );
        foreach ($selection_items as $k => $i){
            $arLandFilter['ID'][] = $i['ID'];
        }
        //$arLandFilter = array('!PREVIEW_PICTURE' => false);
        $APPLICATION->IncludeComponent(
            "bitrix:catalog.section",
            "catalog_landing",
            Array(
                "IBLOCK_ID" => "5",
                "IBLOCK_TYPE" => "catalog",
                "FILTER_NAME" => "arLandFilter",
                "PRODUCT_IDS_ORDERED" => $arLandFilter['ID'],
                "USE_FILTER" => 'Y',
                "ACTION_VARIABLE" => "action",
                "ADD_PICT_PROP" => "MORE_PHOTO",
                "ADD_PROPERTIES_TO_BASKET" => "Y",
                "ADD_SECTIONS_CHAIN" => "N",
                "ADD_TO_BASKET_ACTION" => "ADD",
                "AJAX_MODE" => "N",
                "AJAX_OPTION_ADDITIONAL" => "",
                "AJAX_OPTION_HISTORY" => "N",
                "AJAX_OPTION_JUMP" => "N",
                "AJAX_OPTION_STYLE" => "Y",
                "BASKET_URL" => "/personal/basket.php",
                "BRAND_PROPERTY" => "BRAND_REF",
                "BROWSER_TITLE" => "-",
                "CACHE_FILTER" => "N",
                "CACHE_GROUPS" => "Y",
                "CACHE_TIME" => "36000000",
                "CACHE_TYPE" => "N",
                "COMPATIBLE_MODE" => "Y",
                "CONVERT_CURRENCY" => "Y",
                "CURRENCY_ID" => "RUB",
                "CUSTOM_FILTER" => "",
                "DATA_LAYER_NAME" => "dataLayer",
                "DETAIL_URL" => "",
                "DISABLE_INIT_JS_IN_COMPONENT" => "N",
                "DISCOUNT_PERCENT_POSITION" => "bottom-right",
                "DISPLAY_BOTTOM_PAGER" => "Y",
                "DISPLAY_TOP_PAGER" => "N",
                "ELEMENT_SORT_FIELD" => "SORT",
                "ELEMENT_SORT_FIELD2" => "",
                "ELEMENT_SORT_ORDER" => "",
                "ELEMENT_SORT_ORDER2" => "",
                "HIDE_NOT_AVAILABLE" => "N",
                "HIDE_NOT_AVAILABLE_OFFERS" => "N",
                "INCLUDE_SUBSECTIONS" => "Y",
                "LABEL_PROP" => array("NEWPRODUCT"),
                "LABEL_PROP_MOBILE" => array(),
                "LABEL_PROP_POSITION" => "top-left",
                "LAZY_LOAD" => "Y",
                "LINE_ELEMENT_COUNT" => "3",
                "LOAD_ON_SCROLL" => "N",
                "MESSAGE_404" => "",
                "MESS_BTN_ADD_TO_BASKET" => "В корзину",
                "MESS_BTN_BUY" => "Купить",
                "MESS_BTN_DETAIL" => "Подробнее",
                "MESS_BTN_LAZY_LOAD" => "Показать ещё",
                "MESS_BTN_SUBSCRIBE" => "Подписаться",
                "MESS_NOT_AVAILABLE" => "Нет в наличии",
                "META_DESCRIPTION" => "-",
                "META_KEYWORDS" => "-",
                "PAGER_SHOW_ALL" => "N",
                "PAGER_SHOW_ALWAYS" => "N",
                "PAGER_TITLE" => "Товары",
                "PAGE_ELEMENT_COUNT" => "10",
                "PARTIAL_PRODUCT_PROPERTIES" => "N",
                "PRICE_CODE" => array("BASE"),
                "PRICE_VAT_INCLUDE" => "Y",
                "PRODUCT_BLOCKS_ORDER" => "price,props,sku,quantityLimit,quantity,buttons,compare",
                "PRODUCT_DISPLAY_MODE" => "Y",
                "PRODUCT_ID_VARIABLE" => "id",
                "PRODUCT_PROPS_VARIABLE" => "prop",
                "PRODUCT_QUANTITY_VARIABLE" => "",
                "PRODUCT_ROW_VARIANTS" => "[{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':false},{'VARIANT':'2','BIG_DATA':true}]",
                "PRODUCT_SUBSCRIPTION" => "Y",
                "PROPERTY_CODE" => array("NEWPRODUCT",""),
                "PROPERTY_CODE_MOBILE" => array(),
                "RCM_TYPE" => "personal",
                "SECTION_CODE" => "",
                "SECTION_ID" => "",
                "SECTION_ID_VARIABLE" => "SECTION_ID",
                "SECTION_URL" => "",
                "SEF_MODE" => "N",
                "SET_BROWSER_TITLE" => "Y",
                "SET_LAST_MODIFIED" => "N",
                "SET_META_DESCRIPTION" => "Y",
                "SET_META_KEYWORDS" => "Y",
                "SET_STATUS_404" => "N",
                "SET_TITLE" => "Y",
                "SHOW_404" => "N",
                "SHOW_ALL_WO_SECTION" => "N",
                "SHOW_CLOSE_POPUP" => "N",
                "SHOW_DISCOUNT_PERCENT" => "Y",
                "SHOW_FROM_SECTION" => "N",
                "SHOW_MAX_QUANTITY" => "N",
                "SHOW_OLD_PRICE" => "N",
                "SHOW_PRICE_COUNT" => "1",
                "SHOW_SLIDER" => "Y",
                "TEMPLATE_THEME" => "blue",
                "USE_ENHANCED_ECOMMERCE" => "Y",
                "USE_MAIN_ELEMENT_SECTION" => "N",
                "USE_PRICE_COUNT" => "N",
                "USE_PRODUCT_QUANTITY" => "N"
            )
        );?>
    </div>
</div>
<?php }?>
<div class="con_block_si">
    <h3 class="digit-t-left">Наши офисы в&nbsp;Санкт-Петербурге:</h3>
    <div class="block_fi-content">
        <div class="block_fi-content_item digit-t-left">
            <?php $APPLICATION->IncludeComponent(
                "bitrix:news.detail",
                "shop_landing",
                Array(
                    "IBLOCK_TYPE" => "content",
                    "IBLOCK_ID" => "11",
                    "ELEMENT_ID" => "10323",
                    "FIELD_CODE" => array(
                        0 => "NAME",
                        1 => "PREVIEW_PICTURE",
                        2 => "DETAIL_TEXT",
                        3 => "DETAIL_PICTURE",
                        4 => "",
                    ),
                    "PROPERTY_CODE" => array(
                        0 => "EMAIL",
                        1 => "ADDRESS",
                        2 => "MAP",
                        3 => "METRO",
                        4 => "SCHEDULE",
                        5 => "PHONE",
                        6 => "MORE_PHOTOS",
                        7 => "",
                    ),
                    "SET_TITLE" => 'N',
                    "CACHE_TYPE" => 'N',
                    "CACHE_TIME" => "36000000",
                    "CACHE_GROUPS" => "N",
                    "USE_PERMISSIONS" => 'N',
                    "GROUP_PERMISSIONS" => 'N',
                    "GOOGLE_API_KEY" => "",
                    "MAP_TYPE" => "0",
                    "CONTROLS" => array(
                        0 => "ZOOM"
                    ),
                    "TAGS" => array(
                        0 => "Проверка зрения",
                        1 => "Оправы",
                        2 => "Солнцезащитные очки",
                        3 => "Очки",
                        4 => "Стилисты-консультанты",
                        5 => "Премиальные бренды"
                    ),
                    'CONTACT' => array(
                        'TEL' => '8 (800) 500-50-43',
                        'TEXT' => 'Бесплатно по России'
                    ),
                    'TIMEWORK' => array(
                        'TIME' => '11:00 - 21:00',
                        'TEXT' => 'Работаем ежедневно'
                    )
                ),
                $component
            );?>
        </div>
        <div class="block_fi-content_item digit-t-right">
            <?php $APPLICATION->IncludeComponent(
                "bitrix:news.detail",
                "shop_landing",
                Array(
                    "IBLOCK_TYPE" => "content",
                    "IBLOCK_ID" => "11",
                    "ELEMENT_ID" => "10324",
                    "FIELD_CODE" => array(
                        0 => "NAME",
                        1 => "PREVIEW_PICTURE",
                        2 => "DETAIL_TEXT",
                        3 => "DETAIL_PICTURE",
                        4 => "",
                    ),
                    "PROPERTY_CODE" => array(
                        0 => "EMAIL",
                        1 => "ADDRESS",
                        2 => "MAP",
                        3 => "METRO",
                        4 => "SCHEDULE",
                        5 => "PHONE",
                        6 => "MORE_PHOTOS",
                        7 => "",
                    ),
                    "SET_TITLE" => 'N',
                    "CACHE_TYPE" => 'N',
                    "CACHE_TIME" => "36000000",
                    "CACHE_GROUPS" => "N",
                    "USE_PERMISSIONS" => 'N',
                    "GROUP_PERMISSIONS" => 'N',
                    "GOOGLE_API_KEY" => "",
                    "MAP_TYPE" => "0",
                    "CONTROLS" => array(
                        0 => "ZOOM"
                    ),
                    "TAGS" => array(
                        1 => "Оправы",
                        2 => "Солнцезащитные очки",
                        3 => "Очки",
                        4 => "Стилисты-консультанты",
                        5 => "Премиальные бренды"
                    ),
                    'CONTACT' => array(
                        'TEL' => '8 (800) 500-50-43',
                        'TEXT' => 'Бесплатно по России'
                    ),
                    'TIMEWORK' => array(
                        'TIME' => '11:00 - 21:00',
                        'TEXT' => 'Работаем ежедневно'
                    )
                ),
                $component
            );?>
        </div>
    </div>
</div>

<div class="con_block_se">
    <div class="con_block_se-left digit-t-left">
        <h3>Часто задаваемые вопросы:</h3>
        <div id="se-left-accordion" class="con_block_se-left-accordion">
            <span>
                <label>Нужно&nbsp;ли готовиться?</label>
            </span>
            <div>
                <p>Да. Вот, что нужно сделать:</p>
                <ol>
                    <li><b>Снять контактные линзы</b><br />Жесткие линзы рекомендуется снять за&nbsp;две недели до&nbsp;осмотра, а&nbsp;мягкие&nbsp;&mdash; за&nbsp;2-3&nbsp;часа. Если вы&nbsp;носите линзы, обязательно сообщите об&nbsp;этом врачу.</li>
                    <li><b>Не&nbsp;пользоваться декоративной косметикой</b><br />В&nbsp;день осмотра рекомендуется отказаться от&nbsp;использования косметики для глаз.</li>
                    <li><b>Не&nbsp;употреблять алкоголь</b><br />За&nbsp;сутки до&nbsp;осмотра рекомендуется воздержаться от&nbsp;употребления алкоголя.</li>
                    <li><b>При необходимости, взять солнцезащитные очки</b><br />В&nbsp;случае расширения зрачка во&nbsp;время обследования, солнцезащитные очки помогут защитить глаза от&nbsp;яркого света.</li>
                    <li><b>Не&nbsp;садиться за&nbsp;руль</b><br />Если во&nbsp;время обследования зрачки будут расширены, то&nbsp;в&nbsp;этот день не&nbsp;рекомендуется садиться за&nbsp;руль.</li>
                    <li><b>Взять паспорт или другой документ, удостоверяющий личность, если посещаете нас впервые.</b></li>
                    <li><b>Принести с&nbsp;собой очки</b><br />Если у&nbsp;вас есть очки, их&nbsp;рекомендуется взять с&nbsp;собой на&nbsp;осмотр, чтобы врач мог их&nbsp;использовать для определения остроты зрения.</li>
                    <li><b>Подготовить список лекарств</b><br />Если вы&nbsp;принимаете какие-либо лекарства, включая глазные капли, рекомендуется взять с&nbsp;собой их&nbsp;список.</li>
                    <li><b>Сообщить врачу о&nbsp;предыдущих заболеваниях</b><br />Если у&nbsp;вас были какие-либо заболевания глаз или операции, сообщите об&nbsp;этом врачу.</li>
                    <li><b>Постараться хорошо выспаться.</b></li>
                    <li><b>Накануне осмотра не&nbsp;перегружать глаза.</b></li>
                </ol>
            </div>
            <span>
                <label>Можно ли прийти без записи?</label>
            </span>
            <div>
                <p>Можно, но&nbsp;рекомендуем предварительно записаться, чтобы мы&nbsp;были готовы к&nbsp;вашему визиту и&nbsp;могли начать проверку в&nbsp;назначенное вам время.</p>
                <p>Если вы&nbsp;не&nbsp;записались на&nbsp;проверку зрения, возможно придется дождаться завершения проверки зрения другого посетителя.</p>
            </div>
            <span>
                <label>Как расшифровать рецепт на&nbsp;очки</label>
            </span>
            <div>
                <p>Основные параметры и&nbsp;их&nbsp;расшифровка:</p>
                <p>OD&nbsp;&mdash; правый глаз<br />
                OS&nbsp;&mdash; левый глаз</p>
                <p>SPH&nbsp;&mdash; сфера<br />
                Параметр SPH указывает на&nbsp;оптическую силу.</p>
                <p>CYL&nbsp;&mdash; цилиндр<br />
                Параметр CYL используется в&nbsp;тех случаях, если у&nbsp;пациента имеется астигматизм. В&nbsp;таком случае назначают специальные цилиндрические линзы, а&nbsp;показатели в&nbsp;рецепте указывают на&nbsp;оптическую силу цилиндра.</p>
                <p>AX&nbsp;&mdash; ось<br />
                AX&nbsp;в&nbsp;латыни означает &laquo;ось&raquo;. Данный параметр указывает на&nbsp;положение оси цилиндра. Он&nbsp;обозначен в&nbsp;градусах от&nbsp;0&nbsp;до&nbsp;180. Данный параметр указывают только в&nbsp;том случае, если клиенту рекомендованы очки с&nbsp;астигматическими линзами.</p>
                <p>PD&nbsp;&mdash; межзрачковое расстояние<br />
                Обозначает расстояние между центрами зрачков. Данный параметр измеряется в&nbsp;миллиметрах.</p>
                <p>ADD&nbsp;&mdash; аддидация<br />
                Аддидация указывает на&nbsp;диоптрическую разницу между зонами близи и&nbsp;дали. Например, указаны диоптрии для коррекции зрения на&nbsp;дальних дистанциях, чтобы узнать, какие диоптрии нужны для коррекции на&nbsp;близких дистанциях, прибавляют показатель аддидации.</p>
            </div>
            <span>
                <label>Как часто надо проверять зрение?</label>
            </span>
            <div>
                <p>Если вы&nbsp;не&nbsp;видите признаков проблем со&nbsp;зрением и&nbsp;у&nbsp;вас нет предрасположенности к&nbsp;глазным болезням, то&nbsp;достаточно проходить проверку раз в&nbsp;год, а&nbsp;для детей и&nbsp;лиц старше 40&nbsp;лет рекомендуется более частый осмотр.</p>
                <p>Проверяя зрения у&nbsp;нас, вам не&nbsp;нужно будет запоминать результаты, мы&nbsp;будем вести историю проверок за&nbsp;вас, поэтому вы&nbsp;в&nbsp;любой момент сможете увидеть динамику изменения остроты вашего зрения.</p>
            </div>
            <span>
                <label>Как понять, что мое зрение ухудшилось?</label>
            </span>
            <div>
                <p>Ухудшение зрения может проявляться по-разному, но&nbsp;основными признаками являются:</p>
                <ul>
                    <li>нечеткость видения, как вблизи, так и&nbsp;вдалеке;</li>
                    <li>размытость изображения;</li>
                    <li>трудности с&nbsp;фокусом;</li>
                    <li>ухудшение зрения в&nbsp;сумерках или ночью.</li>
                </ul>
                <p>Также стоит обратить внимание на&nbsp;такие симптомы, как двоение в&nbsp;глазах, &laquo;мушки&raquo; перед глазами, боли в&nbsp;глазах или головные боли.</p>
            </div>
            <span>
                <label>Можно&nbsp;ли у&nbsp;Вас купить готовые очки?</label>
            </span>
            <div>
                <p>Покупка готовых очков&nbsp;&mdash; не&nbsp;самое лучшее решение для большинства людей, у&nbsp;которых есть проблемы со&nbsp;зрением.</p>
                <p>Готовые очки могут подойти тем, кто имеет одинаковое зрение на&nbsp;оба глаза и&nbsp;не&nbsp;страдает астигматизмом, но&nbsp;даже этим людям лучше воздержаться от&nbsp;их&nbsp;использования.</p>
                <p>Очки по&nbsp;рецепту, сделанные на&nbsp;заказ, обеспечивают более точную коррекцию зрения, учитывают индивидуальные особенности, а&nbsp;также не&nbsp;травмируют глаза.</p>
                <p>Неподходящие очки&nbsp;&mdash; это как обувь неподходящего вам размера, вроде&nbsp;бы, носить можно, но&nbsp;это неудобно и&nbsp;может привести к&nbsp;травмам.</p>
            </div>
        </div>
    </div>
    <div class="con_block_se-right desc-flex digit-t-right">
        <div class="con_block_rew-widget_block">
            <iframe src="https://yandex.ru/maps-reviews-widget/1290401932?comments"></iframe>
            <div class="iframe-overlay top"></div>
            <div class="iframe-overlay content"></div>
        </div>
    </div>
</div>