<?$APPLICATION->IncludeComponent(
    "bitrix:menu",
    "vertical_footer_second",
    array(
        "ROOT_MENU_TYPE" => "top",
        "MENU_CACHE_TYPE" => "A",
        "MENU_CACHE_TIME" => "36000000",
        "MENU_CACHE_USE_GROUPS" => "N",
        "MENU_CACHE_GET_VARS" => array(
        ),
        "MAX_LEVEL" => "3",
        "CHILD_MENU_TYPE" => "topchild",
        "USE_EXT" => "N",
        "ALLOW_MULTI_SELECT" => "N",
        "CACHE_SELECTED_ITEMS" => "N",
        "COMPONENT_TEMPLATE" => "horizontal_top",
        "DELAY" => "N",
        "COMPOSITE_FRAME_MODE" => "A",
        "COMPOSITE_FRAME_TYPE" => "AUTO"
    ),
    false
);?>