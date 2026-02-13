<div class="mix-main-block-forms">
    <div class="container-banner container-md">
        <div class="mix-pr-block-info mix-flex">
            <div class="mix-pr-block-logo mix-ma">
                <a href="/">
                    <img src="<?=SITE_TEMPLATE_PATH?>/images/private_design/mixon-logo.png" alt="MIXON">
                </a>
            </div>
            <div class="mix-pr-block-tittle mix-ma">Техническое задание на разработку фирменных элементов для вашего бренда</div>
            <div class="mix-pr-block-subtittle mix-ma">Выберите раздел услуги которая вам необходима</div>
        </div>
    </div>
    <div class="mix-pr-top-menu container-md mix-flex">
        <div class="mix-pr-top-menu-item mix-flex active" data-form="__LOGO"><span>Разработать логотип</span></div>
        <div class="mix-pr-top-menu-item mix-flex" data-form="__ETIC"><span>Разработать этикетку</span></div>
        <div class="mix-pr-top-menu-item mix-flex" data-form="__UPACK"><span>Разработать упаковку</span></div>
    </div>
    <div class="mix-pr-main-block-exercise container-md" id="mix-pr-info-block">
        <div class="mix-pr-exercise-tittle">Техническое задание<br />на разработку Логотипа</div>
        <hr>
        <div class="mix-pr-exercise-info mix-flex">
            <div class="mix-pr-first mix-flex">
                <div class="mix-pr-first-tittle">Стоимость разработки логотипа:</div>
                <div class="mix-pr-first-subtittle">10 000 ₽</div>
            </div>
            <div class="mix-pr-second mix-flex">
                <div class="mix-pr-second-tittle">Что входит в разработку логотипа:</div>
                <div class="mix-pr-second-subtittle">Разработка фирменного знака на основании технического задания</div>
            </div>
            <div class="mix-pr-third mix-flex">
                <div class="mix-pr-third-tittle">Время разработки логотипа:</div>
                <div class="mix-pr-third-subtittle">До 10 рабочих дней, + возможность внести правки (3 раза)</div>
            </div>
        </div>
    </div>
    <!-- FORM___LOGO START-->
    <?$APPLICATION->IncludeComponent("bitrix:main.include", "block_form",
        array(
            "AREA_FILE_SHOW" => "file",
            "PATH" => SITE_DIR."include/forms/private-design__logo.php",
            "FORM" => "__LOGO",
            "ACTIVE" => "Y"
        ),
        false,
        array("HIDE_ICONS" => "Y")
    );?>
    <!-- FORM___LOGO END-->
    <!-- FORM___ETIC START-->
    <?$APPLICATION->IncludeComponent("bitrix:main.include", "block_form",
        array(
            "AREA_FILE_SHOW" => "file",
            "PATH" => SITE_DIR."include/forms/private-design__etic.php",
            "FORM" => "__ETIC",
            "ACTIVE" => "N"
        ),
        false,
        array("HIDE_ICONS" => "Y")
    );?>
    <!-- FORM___ETIC END-->
    <!-- FORM___UPACK START-->
    <?$APPLICATION->IncludeComponent("bitrix:main.include", "block_form",
        array(
            "AREA_FILE_SHOW" => "file",
            "PATH" => SITE_DIR."include/forms/private-design__upack.php",
            "FORM" => "__UPACK",
            "ACTIVE" => "N"
        ),
        false,
        array("HIDE_ICONS" => "Y")
    );?>
    <!-- FORM___UPACK END-->
</div>