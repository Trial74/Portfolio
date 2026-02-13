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
        'circulations' => getCirculation(),
        'skuprops' => $arParams['SKU_PROPS'],
        'arResult' => $arResult,
        'arParams' => $arParams,
        'settings' => $settingsData,
        'template_path' => SITE_TEMPLATE_PATH
    );
?>
    <link href="<?=SITE_TEMPLATE_PATH . '/components/bitrix/catalog.section.list/mobile/mCustomScrollbar/jquery.mCustomScrollbar.min.css'?>" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH . '/components/bitrix/catalog.section.list/mobile/jq_ui/style.css?'.time()?>">
    <script src="<?=SITE_TEMPLATE_PATH . '/components/bitrix/catalog.section.list/mobile/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js'?>"></script>
    <script src="<?=SITE_TEMPLATE_PATH . '/components/bitrix/catalog.section.list/mobile/jq_ui/script.js'?>"></script>

    <div class="full-block-constructor container-fluid h-5">
    <div class="constructor_main" id="<?=$arParams['IDS']['rootDom']?>">
        <div class="row h-100">
            <div class="right-first d-flex justify-content-between align-items-center">
                <div class="logo-constr w-50"><a href="/"><img src="<?=SITE_TEMPLATE_PATH . '/images/constructor/product_constructor.png'?>" alt="MIXON" /></a></div>
                <div class="price-constr">
                    <div class="mixon-basket-price-constr d-flex justify-content-center" id="<?=$arParams['IDS']['rootBlock']['price']['main']?>">
                        <div class="mixon-basket-icon-start"></div>
                        <div class="mixon-price d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['price']['price']?>"><?=Loc::getMessage("CONSTRUCTOR_PRICE")?></div>
                        <div class="mixon-basket-icon-end"></div>
                    </div>
                </div>
            </div>
            <div id="<?=$arParams['IDS']['rootBlock']['leftBlock']['main']?>">
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_1_NAME")?></div></header>
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['firstStep']['main']?>">
                    <div class="label-info-block">
                        <div class="label-info"><?=$MESSAGES['step_1_0']['m_1']?></div>
                        <div class="sublabel-info mt-3"><?=$MESSAGES['step_1_0']['m_2']?></div>
                    </div>
                    <div class="sections-items d-flex flex-column justify-content-between">
                        <div class="first-sections w-100" id="<?=$arParams['IDS']['rootBlock']['firstStep']['sections']?>">
                            <div class="label-section"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                        </div>
                        <div class="first-items w-100" id="<?=$arParams['IDS']['rootBlock']['firstStep']['items']?>">
                            <div class="label-item"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                        </div>
                    </div>
                    <div class="left-logo-first-block position-relative">
                        <div class="logo-item position-absolute" id="<?=$arParams['IDS']['rootBlock']['firstStep']['prodimg']?>"></div>
                        <div class="logo-block position-absolute"></div>
                    </div>
                    <div class="button-block d-flex justify-content-start" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_1']['block']?>">
                        <div class="m_button button-next justify-content-center align-items-center" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_1']['btn']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_NEXT")?></div>
                    </div>
                </div>
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_2_NAME")?></div></header>
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['main']?>">
                    <div class="label-info-block">
                        <div class="label-info"><?=$MESSAGES['step_1_1']['m_1']?></div>
                        <div class="sublabel-info mt-3"><?=$MESSAGES['step_1_1']['m_2']?></div>
                    </div>
                    <div class="selected-item d-flex">
                        <div class="logo-sub-first-block d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block d-flex flex-column justify-content-center">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['itemName']?>"></div>
                        </div>
                    </div>
                    <div class="volume-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['volumeList']['block']?>">
                        <div class="volume-block-label"><?=Loc::getMessage("CONSTRUCTOR_VOLUME")?></div>
                        <div class="d-flex gap-4">
                            <div class="volume-ml"><?=Loc::getMessage("CONSTRUCTOR_VOLUME_ML")?></div>
                            <div class="volume-gr"><?=Loc::getMessage("CONSTRUCTOR_VOLUME_GR")?></div>
                            <div class="volume-list w-50" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['volumeList']['params']?>">
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
                        <div class="d-flex flex-column gap-4 position-relative">
                            <div class="circulation-list w-75" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['circulationList']['params']?>">
                                <div class="label-circulation"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                            </div>
                            <div class="circulation-input w-75">
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
                        <div class="fragrance-color-block d-flex flex-column">
                            <div class="fragrance-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['fragranceList']['block']?>">
                                <div class="fragrance-block-label"><?=Loc::getMessage("CONSTRUCTOR_FRAGRANCE")?></div>
                                <div class="fragrance-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['fragranceList']['params']?>">
                                    <div class="label-fragrance"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                                </div>
                            </div>
                            <div class="color-block" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['colorList']['block']?>">
                                <div class="color-block-label"><?=Loc::getMessage("CONSTRUCTOR_COLOR_PRODUCT")?></div>
                                <div class="color-list" id="<?=$arParams['IDS']['rootBlock']['subfirstStep']['skuParamsDom']['colorList']['params']?>">
                                    <div class="label-color"><div class="text-center"><div class="spinner-border" role="status"></div></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-block d-flex justify-content-start" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_2']['block']?>">
                        <div class="m_button button-next justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_2']['btn']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_NEXT_2")?></div>
                    </div>
                </div>
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_3_NAME")?></div></header>
                <div class="step-block flex-column" id="<?=$arParams['IDS']['rootBlock']['secondStep']['main']?>">
                    <div class="label-info-block">
                        <div class="label-info"><?=$MESSAGES['step_2']['m_1']?></div>
                        <div class="sublabel-info mt-3"><?=$MESSAGES['step_2']['m_2']?></div>
                    </div>
                    <div class="selected-item item-params d-flex">
                        <div class="logo-sub-first-block d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['secondStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block d-flex flex-column justify-content-center">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['secondStep']['itemName']?>"></div>
                            <div class="d-flex gap-1 selects-params" id="<?=$arParams['IDS']['rootBlock']['secondStep']['selectsProps']?>"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-between h-100">
                        <div class="second-services-list-block-main w-100 h-100" id="<?=$arParams['IDS']['rootBlock']['secondStep']['servicesList']?>"></div>
                        <div class="prices-services-block">
                            <div class="label-price-serv" id="<?=$arParams['IDS']['rootBlock']['secondStep']['servicesPrice']?>"><?=Loc::getMessage("CONSTRUCTOR_SERVICES_DIZAIN_PRICE")?></div>
                        </div>
                    </div>
                    <div class="button-block d-flex justify-content-start" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_3']['block']?>">
                        <div class="m_button button-next justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_3']['btn']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_NEXT_2")?></div>
                    </div>
                </div>
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_4_NAME")?></div></header>
                <div class="step-block flex-column" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['main']?>">
                    <div class="label-info-block">
                        <div class="label-info"><?=$MESSAGES['step_3']['m_1']?></div>
                        <div class="sublabel-info mt-3"><?=$MESSAGES['step_3']['m_2']?></div>
                    </div>
                    <div class="selected-item item-params d-flex">
                        <div class="logo-sub-first-block d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block d-flex flex-column justify-content-center">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['itemName']?>"></div>
                            <div class="d-flex gap-1 selects-params" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['selectsProps']?>"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-between h-100">
                        <div class="third-services-list-block-main w-100 h-100" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['servicesList']?>"></div>
                        <div class="prices-services-block">
                            <div class="label-price-serv" id="<?=$arParams['IDS']['rootBlock']['thirdStep']['servicesPrice']?>"><?=Loc::getMessage("CONSTRUCTOR_SERVICES_UPAK_PRICE")?></div>
                        </div>
                    </div>
                    <div class="button-block d-flex justify-content-start" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_4']['block']?>">
                        <div class="m_button button-next justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_4']['btn']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_NEXT_2")?></div>
                    </div>
                </div>
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_5_NAME")?></div></header>
                <div class="step-block flex-column" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['main']?>">
                    <div class="label-info-block">
                        <div class="label-info"><?=$MESSAGES['step_4']['m_1']?></div>
                        <div class="sublabel-info mt-3"><?=$MESSAGES['step_4']['m_2']?></div>
                    </div>
                    <div class="selected-item item-params d-flex">
                        <div class="logo-sub-first-block d-flex justify-content-center align-items-center" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['imgItem']?>"></div>
                        <div class="sub-first-label-block d-flex flex-column justify-content-center">
                            <div class="label-sub-first"><?=Loc::getMessage("CONSTRUCTOR_SELECTED_ITEM")?></div>
                            <div class="item-name-sub-first" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['itemName']?>"></div>
                            <div class="d-flex gap-1 selects-params" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['selectsProps']?>"></div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start justify-content-between h-100">
                        <div class="fourth-services-list-block-main h-100" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['servicesList']?>"></div>
                        <div class="prices-services-block">
                            <div class="label-price-serv" id="<?=$arParams['IDS']['rootBlock']['fourthStep']['servicesPrice']?>"><?=Loc::getMessage("CONSTRUCTOR_SERVICES_UR_PRICE")?></div>
                        </div>
                    </div>
                    <div class="button-block d-flex justify-content-start" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_5']['block']?>">
                        <div class="m_button button-next justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_5']['btn']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_NEXT_2")?></div>
                    </div>
                </div>
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_6_NAME")?></div></header>
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['fifthStep']['main']?>">
                    <div class="flex-column justify-content-start align-items-center" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['finish']?>">
                        <div class="label-info-block info-basket">
                            <div class="label-info">Корзина</div>
                        </div>
                        <hr>
                        <div id="block-basket-scroll">
                            <div class="block-basket" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['basket']?>">
                                <div class="spinner-border text-light mt-auto mb-auto" style="width: 4rem; height: 4rem;">
                                    <span class="sr-only">Загрузка...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-block d-flex flex-column gap-3 justify-content-start" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_6']['block']?>">
                        <div class="m_button button-re justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_6']['btnRe']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_REOPEN")?></div>
                        <div class="m_button button-next justify-content-center align-items-center start" data-step="0" id="<?=$arParams['IDS']['rootBlock']['buttons']['m_s_6']['btnToOrder']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_BUTTON_TO_ORDER")?></div>
                    </div>
                </div>
                <header><div class="ac_header_name"><?=Loc::getMessage("CONSTRUCTOR_STEP_7_NAME")?></div></header>
                <div class="step-block" id="<?=$arParams['IDS']['rootBlock']['sixthStep']['main']?>">
                    <div class="label-info-block info-basket">
                        <div class="label-info"><?=Loc::getMessage("CONSTRUCTOR_ORDER_STEP")?></div>
                    </div>
                    <hr>
                    <div class="row m-0">
                        <div class="col-12 d-flex flex-column">
                            <div class="delivery-block" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['delivery']?>">
                                <div class="delivery-name"><?=Loc::getMessage("CONSTRUCTOR_DELIVERY_NAME")?></div>
                                <div class="delivery-subname"><?=Loc::getMessage("CONSTRUCTOR_DELIVERY_SUBNAME")?></div>
                                <?if(!empty($arParams['ORDER']['DELIVERY'])){?>
                                <div class="d-flex flex-wrap gap-3">
                                    <?foreach($arParams['ORDER']['DELIVERY'] as $delivery){?>
                                    <div class="delivery-item ord-item-block<?=$delivery['ACTIVE'] ? ' active' : ''?>"><img width="127px" id="<?=$delivery['ID']?>" src="<?=SITE_TEMPLATE_PATH . $delivery['IMG_PATH']?>" alt="<?=$delivery['ALT']?>"></div>
                                    <?}?>
                                </div>
                                <?}else{?>
                                <div>Ошибка</div>
                                <?}?>
                            </div>
                            <hr>
                            <div class="pay-block" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['pay']?>">
                                <div class="pay-name"><?=Loc::getMessage("CONSTRUCTOR_PAYMENT_NAME")?></div>
                                <div class="pay-subname"><?=Loc::getMessage("CONSTRUCTOR_PAYMENT_SUBNAME")?></div>
                                <?if(!empty($arParams['ORDER']['PAYMENT'])){?>
                                <div class="d-flex gap-3">
                                    <?foreach($arParams['ORDER']['PAYMENT'] as $pay){?>
                                    <div class="pay-item ord-item-block<?=$pay['ACTIVE'] ? ' active' : ''?>"><img width="117px" id="<?=$pay['ID']?>" src="<?=SITE_TEMPLATE_PATH . $pay['IMG_PATH']?>" alt="<?=$pay['ALT']?>"></div>
                                    <?}?>
                                </div>
                                <?}else{?>
                                <div>Ошибка</div>
                                <?}?>
                            </div>
                        </div>
                        <hr>
                        <div class="col-12 block-form-order">
                            <div class="user-block-name"><?=Loc::getMessage("CONSTRUCTOR_SALE_USER")?></div>
                            <div class="user-block-subname"><?=Loc::getMessage("CONSTRUCTOR_SALE_SUBUSER")?></div>
                            <div class="block-inputs-user w-100">
                                <form action="/" id="<?=$arParams['IDS']['rootBlock']['rightBlock']['form']?>">
                                    <div class="row">
                                        <div class="col-12 order-input-block">
                                            <div class="label-fio order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="fio_input"></label>
                                                <input class="w-100" name="FIO" placeholder="Ф.И.О *" id="fio_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-12 order-input-block">
                                            <div class="position-relative label-region order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="region_input"></label>
                                                <input class="w-100" name="REGION" placeholder="Регион доставки *" id="region_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-12 order-input-block">
                                            <div class="label-fio order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="mail_input"></label>
                                                <input class="w-100" name="MAIL" placeholder="E-mail *" id="mail_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-12 order-input-block">
                                            <div class="label-region order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="adress_input"></label>
                                                <input class="w-100" name="ADRESS" placeholder="Адрес доставки *" id="adress_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-12 order-input-block">
                                            <div class="label-fio order-label-input">
                                                <label class="labels-form-inputs position-absolute" for="tel_input"></label>
                                                <input class="w-100" name="TEL" placeholder="Телефон *" id="tel_input" type="text">
                                            </div>
                                        </div>
                                        <div class="col-12 order-input-block">
                                            <div class="button-block">
                                                <div class="m_button button-next justify-content-center align-items-center w-100" id="<?=$arParams['IDS']['rootBlock']['buttons']['order']?>" style="display:flex"><?=Loc::getMessage("CONSTRUCTOR_ORDER_SAVE")?></div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    var <?=$obName?> = new JCProductConstructor(<?=CUtil::PhpToJSObject($jsParams, false, true)?>);
</script>