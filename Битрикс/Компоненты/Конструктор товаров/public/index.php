<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

$APPLICATION->SetTitle("Каталог товаров");

global $USER;
$template = '.default';
if(VERSION == 'mobile'){
	$template = 'mobile';
}

$APPLICATION->IncludeComponent(
	"bitrix:catalog.section.list",
	$template,
	Array(
		"VIEW_MODE" => "TEXT",
		"SHOW_PARENT_NAME" => "Y",
		"IBLOCK_TYPE" => "1c_catalog",
		"IBLOCK_ID" => "124",
		"SECTION_ID" => $_REQUEST["SECTION_ID"],
		"SECTION_CODE" => "",
		"SECTION_URL" => "",
		"COUNT_ELEMENTS" => "Y",
		"COUNT_ELEMENTS_FILTER" => "CNT_ACTIVE",
		"HIDE_SECTIONS_WITH_ZERO_COUNT_ELEMENTS" => "N",
		"TOP_DEPTH" => "4",
		"SECTION_FIELDS" => "",
		"SECTION_USER_FIELDS" => "",
		"ADD_SECTIONS_CHAIN" => "Y",
		"CACHE_TYPE" => "N",
		"CACHE_TIME" => "36000000",
		"CACHE_NOTES" => "",
		"CACHE_GROUPS" => "Y",
		"IDS" => array(
			'rootDom' => 'product_constructor',
			'popup' => array(
				'main' => 'mx-constructor-popup',
				'content' => 'mx-popup-content'
			),
			'rootBlock' => array(
				'rightBlock' => array(
					'main' => 'first_right',
					'labelInfo' => 'label_info',
					'labelSubInfo' => 'sublabel_info',
					'infoBlock' => 'info_block',
					'finish' => 'right_finish_block',
					'basket' => 'basket_block',
					'order' => 'order_block',
					'form' => 'form_oeder',
					'delivery' => 'delivery_block',
					'pay' => 'pay_block'
				),
				'leftBlock' => array(
					'main' => 'first_left'
				),
				'steps' => array(
					'main' => 'main-steps',
					'first' => 'first-step',
					'second' => 'second-step',
					'third' => 'third-step',
					'fourth' => 'fourth-step'
				),
				'buttons' => array(
					'm_s_1' => array(
						'block' => 'buttons_block_1',
						'btn' => 'button_1'
					),
					'm_s_2' => array(
						'block' => 'buttons_block_2',
						'btn' => 'button_2'
					),
					'm_s_3' => array(
						'block' => 'buttons_block_3',
						'btn' => 'button_3'
					),
					'm_s_4' => array(
						'block' => 'buttons_block_4',
						'btn' => 'button_4'
					),
					'm_s_5' => array(
						'block' => 'buttons_block_5',
						'btn' => 'button_5'
					),
					'm_s_6' => array(
						'block' => 'buttons_block_6',
						'btnRe' => 'button_6_reopen',
						'btnToOrder' => 'button_6_to_order'
					),
					'block' => 'buttons_block',
					'prev' => 'button-prev',
					'next' => 'button-next',
					'order' => 'button-order'
				),
				'price' => array(
					'main' => 'price_block_main',
					'price' => 'price_block',
					'priceFinish' => 'price_finish_block'
				),
				'firstStep' => array(
					'main' => 'first_block',
					'prodimg' => 'product-img',
					'sections' => 'first_sections',
					'sList' => 'list_sections',
					'scrollSList' => 'scrollSection',
					'items' => 'first_items',
					'iList' => 'list_items'
				),
				'subfirstStep' => array(
					'main' => 'sub_first_block',
					'itemName' => 'item_name',
					'imgItem' => 'image_select_item',
					'skuParamsDom' => array(
						'circulationList' => array(
							'block' => 'circulation_block',
							'params' => 'subfirstStep_circulation',
							'list' => 'list_circulation',
							'circuInput' => 'circulation_input',
						),
						'volumeList' => array(
							'block' => 'volume_block',
							'params' => 'subfirstStep_volumes',
							'list' => 'list_volumes'
						),
						'fragranceList' => array(
							'block' => 'fragrance_block',
							'params' => 'subfirstStep_fragrances',
							'list' => 'list_fragrances',
							'scrollBlock' => 'scrollAromat'
						),
						'colorList' => array(
							'block' => 'color_block',
							'params' => 'subfirstStep_colors',
							'list' => 'list_colors'
						),
						'diametr' => array(
							'block' => 'diametr_block',
							'params' => 'subfirstStep_diameters',
							'list' => 'list_diameters'
						),
						'dlina' => array(
							'block' => 'dlina_block',
							'params' => 'subfirstStep_dlina',
							'list' => 'list_dlina'
						),
						'izgib' => array(
							'block' => 'izgib_block',
							'params' => 'subfirstStep_izgib',
							'list' => 'list_izgib'
						)
					)
				),
				'secondStep' => array(
					'main' => 'second_block',
					'itemName' => 'item_name_second',
					'imgItem' => 'image_select_item_second',
					'selectsProps' => 'selects_props_second_block',
					'servicesList' => 'services_list_second_block',
					'servicesPrice' => 'services_price_second_block'
				),
				'thirdStep' => array(
					'main' => 'third_block',
					'itemName' => 'item_name_third',
					'imgItem' => 'image_select_item_third',
					'selectsProps' => 'selects_props_third_block',
					'servicesList' => 'services_list_third_block',
					'servicesPrice' => 'services_price_third_block'
				),
				'fourthStep' =>  array(
					'main' => 'fourth_block',
					'itemName' => 'item_name_fourth',
					'imgItem' => 'image_select_item_fourth',
					'selectsProps' => 'selects_props_fourth_block',
					'servicesList' => 'services_list_fourth_block',
					'servicesPrice' => 'services_price_fourth_block'
				),
				'fifthStep' =>  array(
					'main' => 'fifth_block',
					'prodimg' => 'product-img-basket',
				),
				'sixthStep' => array(
					'main' => 'sixth_block',
				)
			)
		),
		"SKU_PROPS" => array(
			'AROMAT_OBSHCHIY' => array(
				'CODE' => 'AROMAT_OBSHCHIY',
				'NAME' => 'Аромат'
			),
			'OBYEM_OBSHCHIY' => array(
				'CODE' => 'OBYEM_OBSHCHIY',
				'NAME' => 'Объём'
			),
			'TSVET' => array(
				'CODE' => 'TSVET',
				'NAME' => 'Цвет'
			),
			'DIAMETR' => array(
				'CODE' => 'DIAMETR',
				'NAME' => 'Диаметр'
			),
			'DLINA' => array(
				'CODE' => 'DLINA',
				'NAME' => 'Длина'
			),
			'IZGIB' => array(
				'CODE' => 'IZGIB',
				'NAME' => 'Изгиб'
			)
		),
		"ORDER" => array(
			"DELIVERY" => array(
				0 => array(
					"ID" => 169,
					"IMG_PATH" => '/images/constructor/order/cdek.png',
					"ALT" => 'CDEK',
					"ACTIVE" => true
				),
				1 => array(
					"ID" => 180,
					"IMG_PATH" => '/images/constructor/order/pochta.png',
					"ALT" => 'Почта России'
				),
				2 => array(
					"ID" => 3,
					"IMG_PATH" => '/images/constructor/order/samovivoz.png',
					"ALT" => 'Самовывоз'
				),
			),
			"PAYMENT" => array(
				0 => array(
					"ID" => 8,
					"IMG_PATH" => '/images/constructor/order/payment.png',
					"ALT" => 'Оплата по счёту',
					"ACTIVE" => true
				),
			)
		)
	)
);?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>