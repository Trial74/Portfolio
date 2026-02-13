<?php require($_SERVER["DOCUMENT_ROOT"] . '/bitrix/modules/main/include/prolog_before.php');
$APPLICATION->SetTitle("Проверка зрения");
$APPLICATION->SetPageProperty("description", "Проверка зрения в СПб с точной диагностикой и подбором очков и линз в REFACED. Профессиональные врачи-оптометристы, современное оборудование и индивидуальный подход. Запишитесь онлайн!");
$APPLICATION->SetPageProperty("title", "Проверка зрения в Санкт-Петербурге с подбором очков и линз в REFACED");

/**
 * @global $APPLICATION
 */

$APPLICATION->IncludeComponent(
    "refaced:vision.landing",
    "",
    array(
        'PARAMS' => $_REQUEST
    )
);