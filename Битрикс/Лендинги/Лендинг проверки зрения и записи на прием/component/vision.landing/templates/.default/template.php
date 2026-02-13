<?php if( !defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true ) die();

/**
 * Входной шаблон компонента лендинга
 * @global $APPLICATION
 * @global $component
 * @var $arParams
 */

$APPLICATION->ShowHead(false);
CJSCore::Init(array("jquery", "popup", "date", "sidepanel"));
\Bitrix\Main\UI\Extension::load("ui.forms");
\Bitrix\Main\UI\Extension::load("ui.layout-form");
\Bitrix\Main\UI\Extension::load("ui.buttons");
\Bitrix\Main\UI\Extension::load("ui.alerts");?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Проверка зрения</title>
    <meta name="description" content="Четкое зрение — важнее, чем кажется. Refaced бутик дизайнерских очков">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <meta content="true" name="HandheldFriendly" />
    <meta content="width" name="MobileOptimized" />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
    <!--<link rel="stylesheet" href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">-->
    <link rel="stylesheet" href="/bitrix/templates/refaced/vendor/css/carousel/owl/owl.carousel.css">
    <link rel="stylesheet" href="/bitrix/templates/refaced/vendor/css/carousel/owl/owl.theme.default.css">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH.'/vendor/fonts/font-awesome/css/font-awesome.min.css'?>">
    <script src="/bitrix/templates/refaced/vendor/js/carousel/owl/owl.carousel.js"></script>
    <script src="/bitrix/js/refaced/jquery.morecontent.js"></script>
    <script src="/bitrix/js/refaced/ScrollMagic.min.js"></script>
    <script src="/bitrix/js/refaced/smooth-scrollbar.min.js"></script>
    <script src="/bitrix/js/refaced/jquery-ui.js"></script>
    <script src="/bitrix/js/refaced/jquery.maskedinput.min.js"></script>
    <script src="https://unpkg.com/imask"></script>
    <script src="https://cdn.jsdelivr.net/npm/add-to-calendar-button@2" async defer></script>
</head>
<body>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(102969881, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/102969881" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<div class="scroll_bar_block">
    <?php $APPLICATION->ShowPanel();?>
    <div class="main_container" >
        <div class="main_sub_container">
            <div class="container_content">
                <!-- Navbar start -->
                <?php $APPLICATION->IncludeComponent(
                    "refaced:vision.landing",
                    "navbar",
                    array(),
                    $component
                );?>
                <!-- Navbar end -->
                <!-- Content start -->
                <?php $APPLICATION->IncludeComponent(
                    "refaced:vision.landing",
                    "content",
                    array(),
                    $component
                );?>
                <!-- Content end -->
                <!-- Footer start -->
                <?php $APPLICATION->IncludeComponent(
                    "refaced:vision.landing",
                    "footer",
                    array(),
                    $component
                );?>
                <!-- Footer end -->
            </div>
        </div>
    </div>
</div>
<script>
    const landRequest = <?= json_encode($arParams['PARAMS'], JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) ?>;
</script>
</body>
</html>
