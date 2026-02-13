<input name="NAME_FORM" type="hidden" value="Техническое задание на разработку Логотипа">
<div class="mix-pr-main-block-obsh-form container-md">
    <div class="mix-pr-obsh-tittle">Общая информация</div>
    <div class="mb-3">
        <label for="input1_11" class="form-label" data-id="1_11"><span>1.1</span><div>Полное название компании, которое будет в логотипе. Дополнительный текст, который должен быть в логотипе (если нужен)</div></label>
        <input name="NAME_COMPANY" type="text" class="form-control" id="input1_11" data-label="1_11">
    </div>
    <div class="mb-3">
        <label for="input1_12" class="form-label" data-id="1_12"><span>1.2</span><div>Целевая аудитория (основные характеристики потребителя)</div></label>
        <input name="CEL_AUDITOR" type="text" class="form-control" id="input1_12" data-label="1_12">
    </div>
    <div class="mb-3">
        <label for="input1_13" class="form-label" data-id="1_13"><span>1.3</span><div>Конкуренты (желательно с указанием адресов сайтов)</div></label>
        <input name="KONKURENTS" type="text" class="form-control" id="input1_13" data-label="1_13">
    </div>
    <div class="mb-3">
        <label for="input1_14" class="form-label" data-id="1_14"><span>1.4</span><div>Конкурентные преимущества вашего продукта/услуги</div></label>
        <input name="KONK_PREIM" type="text" class="form-control" id="input1_14" data-label="1_14">
    </div>
    <div class="mb-3">
        <label for="input1_15" class="form-label" data-id="1_15"><span>1.5</span><div>Какая идея и смысл заложены в название компании</div></label>
        <input name="IDEA" type="text" class="form-control" id="input1_15" data-label="1_15">
    </div>
    <div class="mb-3">
        <label for="input1_16" class="form-label" data-id="1_16"><span>1.6</span><div>Каких целей предполагается достичь с помощью данного проекта?</div></label>
        <input name="CELI" type="text" class="form-control" id="input1_16" data-label="1_16">
    </div>
</div>
<div class="mix-pr-main-block-obsh-form container-md">
    <div class="mix-pr-obsh-tittle">Стилистика</div>
    <div class="mb-3">
        <label class="form-label" data-id="1_21"><span>2.1</span><div>Образ будущего стиля (выберите направление)</div></label>
        <div class="form-check form-check-inline">
            <input id="STYLE_Radio1" class="form-check-input_21" type="radio" name="radio_STYLE" value="Строгий стиль" data-label="1_21" checked>
            <label class="form-check-label_21 active" for="STYLE_Radio1">Строгий стиль</label>
        </div>
        <div class="form-check form-check-inline">
            <input id="STYLE_Radio2" class="form-check-input_21" type="radio" name="radio_STYLE" value="Минималистичный" data-label="1_21">
            <label class="form-check-label_21" for="STYLE_Radio2">Минималистичный</label>
        </div>
        <div class="form-check form-check-inline">
            <input id="STYLE_Radio3" class="form-check-input_21" type="radio" name="radio_STYLE" value="Молодёжный" data-label="1_21">
            <label class="form-check-label_21" for="STYLE_Radio3">Молодёжный</label>
        </div>
        <div class="form-check form-check-inline">
            <input id="STYLE_Radio4" class="form-check-input_21" type="radio" name="radio_STYLE" value="Динамичный" data-label="1_21">
            <label class="form-check-label_21" for="STYLE_Radio4">Динамичный</label>
        </div>
    </div>
    <div class="mb-3">
        <label for="input1_22" class="form-label" data-id="1_22"><span>2.2</span><div>Укажите несколько работ, которые могут послужить примером по стилю</div></label>
        <input name="PRIMER" type="text" class="form-control" id="input1_22" data-label="1_22">
    </div>
    <div class="mb-3">
        <label class="form-label" data-id="1_23"><span>2.3</span><div>Пожелания по логотипу (выберите направление)</div></label>
        <div class="mix-pr-group-check-23 mix-flex">
            <div class="form-check form-check-inline">
                <label class="form-check-label_23 mix-flex" for="LOGO_Radio1">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/form_logo/mono.png" alt="Аббревиатура и монограмма">
                    <div class="form-check-label_23_tittle">Аббревиатура и монограмма</div>
                    <div class="form-check-label_23_check active"></div>
                    <input id="LOGO_Radio1" class="form-check-input_23" type="radio" name="radio_LOGO" value="Аббревиатура и монограмма" data-label="1_23" checked>
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label_23 mix-flex" for="LOGO_Radio2">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/form_logo/mark.png" alt="Логотип-слово (торговые марки)">
                    <div class="form-check-label_23_tittle">Логотип-слово (торговые марки)</div>
                    <div class="form-check-label_23_check"></div>
                    <input id="LOGO_Radio2" class="form-check-input_23" type="radio" name="radio_LOGO" value="Логотип-слово (торговые марки)" data-label="1_23">
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label_23 mix-flex" for="LOGO_Radio3">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/form_logo/symb.png" alt="Графический знак (или логотип-символ)">
                    <div class="form-check-label_23_tittle">Графический знак (или логотип-символ)</div>
                    <div class="form-check-label_23_check"></div>
                    <input id="LOGO_Radio3" class="form-check-input_23" type="radio" name="radio_LOGO" value="Графический знак (или логотип-символ)" data-label="1_23">
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label_23 mix-flex" for="LOGO_Radio4">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/form_logo/abst.png" alt="Абстрактный логотип">
                    <div class="form-check-label_23_tittle">Абстрактный логотип</div>
                    <div class="form-check-label_23_check"></div>
                    <input id="LOGO_Radio4" class="form-check-input_23" type="radio" name="radio_LOGO" value="Абстрактный логотип" data-label="1_23">
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label_23 mix-flex" for="LOGO_Radio5">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/form_logo/tegr.png" alt="Текстово-графический">
                    <div class="form-check-label_23_tittle">Текстово-графический</div>
                    <div class="form-check-label_23_check"></div>
                    <input id="LOGO_Radio5" class="form-check-input_23" type="radio" name="radio_LOGO" value="Текстово-графический" data-label="1_23">
                </label>
            </div>
            <div class="form-check form-check-inline">
                <label class="form-check-label_23 mix-flex" for="LOGO_Radio6">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/form_logo/embl.png" alt="Эмблема">
                    <div class="form-check-label_23_tittle">Эмблема</div>
                    <div class="form-check-label_23_check"></div>
                    <input id="LOGO_Radio6" class="form-check-input_23" type="radio" name="radio_LOGO" value="Эмблема" data-label="1_23">
                </label>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="input1_24" class="form-label" data-id="1_24"><span>2.4</span><div>Примеры понравившихся логотипов с указанием конкретных деталей (композиция, цвета, типографика, идея)</div></label>
        <input name="PRIMERI_LOGO" type="text" class="form-control" id="input1_24" data-label="1_24">
    </div>
    <div class="mb-3">
        <label for="input1_25" class="form-label" data-id="1_25"><span>2.5</span><div>Цветовая гамма (желательные и нежелательные цвета)</div></label>
        <input name="CVETOV_GAMMA" type="text" class="form-control" id="input1_25" data-label="1_25">
    </div>
    <div class="mb-3">
        <label for="input1_26" class="form-label" data-id="1_26"><span>2.6</span><div>Образы, графические элементы, которых следует избегать в работе</div></label>
        <input name="OBRAZI_ELEM" type="text" class="form-control" id="input1_26" data-label="1_26">
    </div>
</div>
<div class="mix-pr-main-block-obsh-form container-md">
    <div class="mix-pr-obsh-tittle">Дополнительно</div>
    <div class="mb-3">
        <label for="input1_31" class="form-label" data-id="1_31"><span>3.1</span><div>Укажите дополнительную информацию, которая на ваш взгляд могла бы быть полезной при разработке логотипа</div></label>
        <input name="DOP_INFO" type="text" class="form-control" id="input1_31" data-label="1_31">
    </div>
    <div class="mix-pr-footer mix-flex">
        <div class="mix-pr-footer-left-block">Вы заполнили всю информацию, теперь отправьте это нам для начала работы над образом вашего бренда</div>
        <div class="mix-pr-footer-right-block">
            <div class="mix-pr-submit mix-flex" id="mix-pr-submit__logo" data-form="__LOGO"><span>Отправить в разработку</span></div>
        </div>
    </div>
</div>