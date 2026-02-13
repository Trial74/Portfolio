<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc,
    Bitrix\Highloadblock as HL;

CJSCore::Init(array("jquery"));

$this->setFrameMode(true);
$obName = "ob".preg_replace("/[^a-zA-Z0-9_]/", "x", $this->GetEditAreaId((!empty($arParams["RCM_ID"]) ? "_".md5($arParams["RCM_ID"]) : "")));
$hlID = 13;
$hlblock = HL\HighloadBlockTable::getById($hlID)->fetch();
$entity = HL\HighloadBlockTable::compileEntity($hlblock);
$entityData = $entity->getDataClass();
$settingsData = $entityData::getList(array(
    "select" => array("UF_*"),
    "filter" => array('ID' => 1)
))->fetch();

//vlog(VERSION);
global $USER;
if(VERSION == 'mobile'){
//if($USER->GetID() != 10354 && $USER->GetID() != 2){?>

    <video id="block_vid" style="width:100%;" autoplay loop muted playsinline>
        <source src="soon.mp4?150620230" type="video/mp4" autoplay="true">
    </video>
    <script>
        $(document).ready(function(){ $("#block_vid")[0].play(); });
    </script>


<?}else{
    $MESSAGES = array(
        'step_1_0' => array(
            'm_1' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP10_M1"),
            'm_2' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP10_M2")
        ),
        'step_1_1' => array(
            'm_1' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP11_M1"),
            'm_2' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP11_M2")
        ),
        'step_2' => array(
            'm_1' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP2_M1"),
            'm_2' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP2_M2")
        ),
        'step_3' => array(
            'm_1' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP3_M1"),
            'm_2' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP3_M2")
        ),
        'step_4' => array(
            'm_1' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP4_M1"),
            'm_2' => Loc::getMessage("CONSTRUCTOR_MESS_ARR_STEP4_M2")
        ),
        39833 => Loc::getMessage("CONSTRUCTOR_MESS_UPAK_1"),
        39840 => Loc::getMessage("CONSTRUCTOR_MESS_UPAK_2"),
        39836 => Loc::getMessage("CONSTRUCTOR_MESS_UPAK_3"),
        39838 => Loc::getMessage("CONSTRUCTOR_MESS_UPAK_4")
    );

    $jsParams = array(
        'ids' => $arParams['IDS'],
        'mess' => $MESSAGES,
        'circulations' => getCirculation(),//$arParams['CIRCULATIONS'],
        'skuprops' => $arParams['SKU_PROPS'],
        'arResult' => $arResult,
        'arParams' => $arParams,
        'settings' => $settingsData,
        'template_path' => SITE_TEMPLATE_PATH
    );
?>
    <link href="<?=SITE_TEMPLATE_PATH . '/components/bitrix/catalog.section.list/.default/mCustomScrollbar/jquery.mCustomScrollbar.min.css'?>" rel="stylesheet" type="text/css" />
    <script src="<?=SITE_TEMPLATE_PATH . '/components/bitrix/catalog.section.list/.default/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js'?>"></script>
    <div class="full-block-constructor container-fluid h-5">
    <div class="constructor_main" id="<?=$arParams['IDS']['rootDom']?>">
        <div class="row h-100">
            <div class="col-7" id="<?=$arParams['IDS']['rootBlock']['leftBlock']['main']?>">
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['firstStep']['main']?>" style="display:block">
                    <div class="sections-items d-flex">
                        <div class="first-sections w-100" id="<?=$arParams['IDS']['rootBlock']['firstStep']['sections']?>">
                            <div class="label-section"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                        </div>
                        <div class="first-items w-100" id="<?=$arParams['IDS']['rootBlock']['firstStep']['items']?>">
                            <div class="label-item"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                        </div>
                    </div>
                    <div class="left-logo-first-block h-100 position-relative">
                        <div class="logo-item position-absolute" id="<?=$arParams['IDS']['rootBlock']['firstStep']['prodimg']?>"></div>
                        <div class="logo-block position-absolute"></div>
                    </div>
                </div>
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['main']?>" style="display:none">
                    <div class="d-flex">
                        <div class="logo-sub-first-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['itemName']?>"></div>
                        </div>
                    </div>
                    <div class="volume-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['volumeList']['block']?>">
                        <div class="volume-block-label"><?=Loc::getMessage("CONSTRUCTOR_VOLUME")?></div>
                        <div class="d-flex gap-4">
                            <div class="volume-ml"><?=Loc::getMessage("CONSTRUCTOR_VOLUME_ML")?></div>
                            <div class="volume-gr"><?=Loc::getMessage("CONSTRUCTOR_VOLUME_GR")?></div>
                            <div class="volume-list w-25" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['volumeList']['params']?>">
                                <div class="label-volume"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="izgib-diametr-block-main">
                        <div class="izgib-diametr-block d-flex gap-5">
                            <div class="izgib-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['izgib']['block']?>">
                                <div class="izgib-block-label"><?=Loc::getMessage("CONSTRUCTOR_IZGIB")?></div>
                                <div class="izgib-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['izgib']['params']?>">
                                    <div class="label-izgib"></div>
                                </div>
                            </div>
                            <div class="diametr-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['diametr']['block']?>">
                                <div class="diametr-block-label"><?=Loc::getMessage("CONSTRUCTOR_DIAMETR")?></div>
                                <div class="diametr-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['diametr']['params']?>">
                                    <div class="label-diametr"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dlina-block w-25" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['dlina']['block']?>">
                        <div class="dlina-block-label"><?=Loc::getMessage("CONSTRUCTOR_DLINA")?></div>
                        <div class="dlina-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['dlina']['params']?>">
                            <div class="label-dlina"></div>
                        </div>
                    </div>
                    <div class="circulation-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['circulationList']['block']?>">
                        <div class="circulation-block-label">
                            <div class="circ-label"><?=Loc::getMessage("CONSTRUCTOR_CIRCULATION_LABEL")?></div>
                            <div class="circ-sublabel"><?=Loc::getMessage("CONSTRUCTOR_CIRCULATION_SUB_LABEL")?></div>
                        </div>
                        <div class="d-flex gap-4 position-relative">
                            <div class="circulation-list w-25" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['circulationList']['params']?>">
                                <div class="label-circulation"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                            </div>
                            <div class="circulation-input w-30">
                                <div class="label-circinput">
                                    <input
                                            class="w-100"
                                            placeholder="<?=Loc::getMessage("CONSTRUCTOR_PLACEHOLDER_INPUT")?>"
                                            id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['circulationList']['circuInput']?>"
                                            type="number"
                                            min="0"
                                            max="9999"
                                    />
                                </div>
                            </div>
                            <div class="position-absolute" id="price-one-t"></div>
                            <div class="position-absolute" id="price-one-i"></div>
                        </div>
                    </div>
                    <div class="fragrance-color-block-main">
                        <div class="fragrance-color-block d-flex gap-5">
                            <div class="color-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['colorList']['block']?>">
                                <div class="color-block-label"><?=Loc::getMessage("CONSTRUCTOR_COLOR_PRODUCT")?></div>
                                <div class="color-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['colorList']['params']?>">
                                    <div class="label-color"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                                </div>
                            </div>
                            <div class="fragrance-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['fragranceList']['block']?>">
                                <div class="fragrance-block-label"><?=Loc::getMessage("CONSTRUCTOR_FRAGRANCE")?></div>
                                <div class="fragrance-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['fragranceList']['params']?>">
                                    <div class="label-fragrance"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-block flex-column" id="<?=$arParams['IDS']['rootBlock']['secondStep']['main']?>" style="display:none">
                    <div class="d-flex">
                        <div class="logo-sub-first-block" id="<?=$arParams['IDS']['rootBlock']['secondStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['secondStep']['itemName']?>"></div>
                            <div class="d-flex gap-3 selects-params" id="<?=$arParams['IDS']['rootBlock']['secondStep']['selectsProps']?>"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-between h-100">
                        <div class="second-services-list-block-main h-100" id="<?=$arParams['IDS']['rootBlock']['secondStep']['servicesList']?>"></div>
                        <div class="prices-services-block">
                            <div class="label-price-serv" id="<?=$arParams['IDS']['rootBlock']['secondStep']['servicesPrice']?>"><?=Loc::getMessage("CONSTRUCTOR_SERVICES_DIZAIN_PRICE")?></div>
                        </div>
                    </div>
                </div>
                <div class="step-block flex-column" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['main']?>" style="display:none">
                    <div class="d-flex">
                        <div class="logo-sub-first-block" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['itemName']?>"></div>
                            <div class="d-flex gap-3 selects-params" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['selectsProps']?>"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-between h-100">
                        <div class="third-services-list-block-main h-100" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['servicesList']?>"></div>
                        <div class="prices-services-block">
                            <div class="label-price-serv" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['servicesPrice']?>"><?=Loc::getMessage("CONSTRUCTOR_SERVICES_UPAK_PRICE")?></div>
                        </div>
                    </div>
                </div>
                <div class="step-block flex-column" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['main']?>" style="display:none">
                    <div class="d-flex">
                        <div class="logo-sub-first-block" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['itemName']?>"></div>
                            <div class="d-flex gap-3 selects-params" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['selectsProps']?>"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-between h-100">
                        <div class="fourth-services-list-block-main h-100" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['servicesList']?>"></div>
                        <div class="prices-services-block">
                            <div class="label-price-serv" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['servicesPrice']?>"><?=Loc::getMessage("CONSTRUCTOR_SERVICES_UR_PRICE")?></div>
                        </div>
                    </div>
                </div>
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['fifthStep']['main']?>" style="display:none">
                    <div class="logo-constr w-50"><a href="/"><img src="<?=SITE_TEMPLATE_PATH . '/images/constructor/product_constructor.png'?>" alt="MIXON" /></a></div>
                    <div class="left-logo-first-block h-100 position-relative">
                        <div class="logo-item position-absolute" id="<?=$arParams['IDS']['rootBlock']['fifthStep']['prodimg']?>"></div>
                        <div class="logo-block position-absolute"></div>
                    </div>
                </div>
            </div>
            <div class="col-5" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['main']?>">
                <div id="<?=$arParams['IDS']['rootBlock']['rightBlock']['infoBlock']?>">
                    <div class="right-first d-flex">
                        <div class="logo-constr w-50"><a href="/"><img src="<?=SITE_TEMPLATE_PATH . '/images/constructor/product_constructor.png'?>" alt="MIXON" /></a></div>
                        <div class="price-constr w-50">
                            <div class="mixon-basket-price-constr d-flex justify-content-center" id="<?=$arParams['IDS']['rootBlock']['price']['main']?>">
                                <div class="mixon-basket-icon-start"></div>
                                <div class="mixon-price d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['price']['price']?>"><?=Loc::getMessage("CONSTRUCTOR_PRICE")?></div>
                                <div class="mixon-basket-icon-end"></div>
                            </div>
                        </div>
                    </div>
                    <div id="<?=$arParams['IDS']['rootBlock']['steps']['main']?>" class="right-second-steps d-flex justify-content-between mx-w-50 mt-6">
                        <div id="<?=$arParams['IDS']['rootBlock']['steps']['first']?>" class="active-step"></div>
                        <div id="<?=$arParams['IDS']['rootBlock']['steps']['second']?>"></div>
                        <div id="<?=$arParams['IDS']['rootBlock']['steps']['third']?>"></div>
                        <div id="<?=$arParams['IDS']['rootBlock']['steps']['fourth']?>"></div>
                    </div>
                    <div class="label-info-block">
                        <div class="label-info" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['labelInfo']?>"></div>
                        <div class="sublabel-info mt-3" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['labelSubInfo']?>"></div>
                    </div>
                </div>
                <div class="flex-column justify-content-start align-items-center" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['finish']?>" style="display:none;">
                    <div class="right-first d-flex align-self-end">
                        <div class="price-constr w-50">
                            <div class="mixon-basket-price-constr d-flex justify-content-center" id="<?=$arParams['IDS']['rootBlock']['price']['main']?>">
                                <div class="mixon-basket-icon-start"></div>
                                <div class="mixon-price d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['price']['priceFinish']?>"><?=Loc::getMessage("CONSTRUCTOR_PRICE")?></div>
                                <div class="mixon-basket-icon-end"></div>
                            </div>
                        </div>
                    </div>
                    <div id="block-basket-scroll">
                        <div class="block-basket" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['basket']?>">
                            <div class="spinner-border text-light mt-auto mb-auto" style="width: 4rem; height: 4rem;">
                                <span class="sr-only">Загрузка...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-block" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['order']?>" style="display:none;">
                    <div class="logo-constr w-50">
                        <a href="/"><img src="<?=SITE_TEMPLATE_PATH . '/images/constructor/product_constructor.png'?>" alt="MIXON" /></a>
                    </div>
                    <div class="name-order-step"><?=Loc::getMessage("CONSTRUCTOR_ORDER_STEP")?></div>
                    <div class="row">
                        <div class="col-4 d-flex flex-column">
                            <div class="delivery-block" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['delivery']?>">
                                <div class="delivery-name"><?=Loc::getMessage("CONSTRUCTOR_DELIVERY_NAME")?></div>
                                <div class="delivery-subname"><?=Loc::getMessage("CONSTRUCTOR_DELIVERY_SUBNAME")?></div>
                                <?if(!empty($arParams['ORDER']['DELIVERY'])){?>
                                    <div class="d-flex gap-3">
                                    <?foreach($arParams['ORDER']['DELIVERY'] as $delivery){?>
                                        <div class="delivery-item ord-item-block<?=$delivery['ACTIVE'] ? ' active' : ''?>"><img width="157px" id="<?=$delivery['ID']?>" src="<?=SITE_TEMPLATE_PATH . $delivery['IMG_PATH']?>" alt="<?=$delivery['ALT']?>"></div>
                                    <?}?>
                                    </div>
                                <?}else{?>
                                    <div>Ошибка</div>
                                <?}?>
                            </div>
                            <div class="pay-block" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['pay']?>">
                                <div class="pay-name"><?=Loc::getMessage("CONSTRUCTOR_PAYMENT_NAME")?></div>
                                <div class="pay-subname"><?=Loc::getMessage("CONSTRUCTOR_PAYMENT_SUBNAME")?></div>
                                <?if(!empty($arParams['ORDER']['PAYMENT'])){?>
                                    <div class="d-flex gap-3">
                                    <?foreach($arParams['ORDER']['PAYMENT'] as $pay){?>
                                        <div class="pay-item ord-item-block<?=$pay['ACTIVE'] ? ' active' : ''?>"><img width="157px" id="<?=$pay['ID']?>" src="<?=SITE_TEMPLATE_PATH . $pay['IMG_PATH']?>" alt="<?=$pay['ALT']?>"></div>
                                    <?}?>
                                    </div>
                                <?}else{?>
                                    <div>Ошибка</div>
                                <?}?>
                            </div>
                        </div>
                        <div class="col-8 block-form-order">
                            <div class="user-block-name"><?=Loc::getMessage("CONSTRUCTOR_SALE_USER")?></div>
                            <div class="user-block-subname"><?=Loc::getMessage("CONSTRUCTOR_SALE_SUBUSER")?></div>
                            <div class="block-inputs-user w-100">
                                <form action="/" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['form']?>">
                                    <div class="row">
                                        <div class="col-6 order-input-block">
                                            <div class="label-fio order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="fio_input"></label>
                                                <input class="w-100" name="FIO" placeholder="Ф.И.О *" id="fio_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-6 order-input-block">
                                            <div class="position-relative label-region order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="region_input"></label>
                                                <input class="w-100" name="REGION" placeholder="Регион доставки *" id="region_input" type="text">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 order-input-block">
                                            <div class="label-fio order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="mail_input"></label>
                                                <input class="w-100" name="MAIL" placeholder="E-mail *" id="mail_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-6 order-input-block">
                                            <div class="label-region order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="adress_input"></label>
                                                <input class="w-100" name="ADRESS" placeholder="Адрес доставки *" id="adress_input" type="text">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 order-input-block">
                                            <div class="label-fio order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="tel_input"></label>
                                                <input class="w-100" name="TEL" placeholder="Телефон *" id="tel_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-6 order-input-block">
                                            <div class="button-block">
                                                <div class="button-next justify-content-center align-items-center w-100" id="<?=$arParams['IDS']['rootBlock']['buttons']['order']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_ORDER_SAVE")?></div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-block d-flex justify-content-start mt-5" id="<?=$arParams['IDS']['rootBlock']['buttons']['block']?>">
                    <div class="button-prev justify-content-center align-items-center me-3" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['prev']?>" style="display:none"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_PREV")?></div>
                    <div class="button-next justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['next']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_NEXT")?></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    var <?=$obName?> = new JCProductConstructor(<?=CUtil::PhpToJSObject($jsParams, false, true)?>);
</script>
<?}?>