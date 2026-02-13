<?require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");?>
<?IncludeTemplateLangFile(__FILE__);
CJSCore::Init(array("fx"));
$scheme = CMain::IsHTTPS() ? "https" : "http";
bxMyFunctions();?>
<!DOCTYPE html>
<html lang="<?=LANGUAGE_ID?>">
<head>
    <?=$APPLICATION->ShowProperty("countersScriptsHead");?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <?$APPLICATION->SetAdditionalCss(SITE_TEMPLATE_PATH."/fonts/SF-UI/stylesheet.css");
    $APPLICATION->SetAdditionalCss(SITE_TEMPLATE_PATH."/fonts/raleway/stylesheet.css");?>
    <title><?$APPLICATION->ShowTitle()?></title>
    <?$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/colors.css", true);
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/css/animation.min.css");
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/css/csshake-default.min.css");
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/js/scrollbar/jquery.scrollbar.min.css");
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/css/bootstrap.min.css");
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/custom.css");
    CJSCore::Init(array("jquery2", "enextIntlTelInput", "popup"));
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/bootstrap.min.js");
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/formValidation.min.js");
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/inputmask.min.js");
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/jquery.hoverIntent.min.js");
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/scrollbar/jquery.scrollbar.min.js");
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/js/main.js");
    $APPLICATION->ShowHead();?>
    <link rel="icon" type="image/png" href="/upload/enext/2f0/0vp8sbckg4578e9d9ugkvs6j4rff233h/favicon.svg">
    <link rel="apple-touch-icon" href="/upload/enext/2f0/0vp8sbckg4578e9d9ugkvs6j4rff233h/favicon.svg">
</head>
<?//BLOCK_FORMS//
$APPLICATION->IncludeComponent("bitrix:main.include", "form_private_design",
    array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => SITE_DIR."include/mix_private_design.php"
    ),
    false,
    array("HIDE_ICONS" => "Y")
);?>