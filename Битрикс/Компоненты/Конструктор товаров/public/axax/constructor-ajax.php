<? require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
define("STOP_STATISTICS", true);
define("NOT_CHECK_PERMISSIONS", true);
$APPLICATION->RestartBuffer();

use Bitrix\Main,
    \Bitrix\Main\Loader,
    Bitrix\Main\Config\Option,
    Bitrix\Main\Context,
    Bitrix\Main\Entity,
    Bitrix\Main\Mail\Event,
    Bitrix\Main\UserTable,
    Bitrix\Sale,
    Bitrix\Sale\Basket,
    Bitrix\Sale\Fuser,
    Bitrix\Sale\Delivery,
    Bitrix\Sale\PaySystem,
    Bitrix\Sale\Order,
    Bitrix\Iblock\Component\Base,
    Bitrix\Currency\CurrencyManager,
    Bitrix\Iblock\Elements\ElementCatalogMixonTable,
    Bitrix\Highloadblock as HL;

header('Content-Type: application/json');

global $USER;
$request = Bitrix\Main\Application::getInstance()->getContext()->getRequest();
$error = false;
$ermess = '';
$result = [];
if($request->isAjaxRequest()) {
    $action = $request->getPost("action");
    switch($action) {
        case "selectItems":
            try {
                $arItems = ElementCatalogMixonTable::getList([
                    'select' => ["ID", "NAME", "SORT", "DETAIL_PICTURE", "PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_" => "NAZVANIE_DLYA_KONSTRUKTORA", "PROPERTY_TIP_TIRAZHA_" => "TIP_TIRAZHA"],
                    'filter' => ["IBLOCK_ID" => 124, "ACTIVE" => "Y", "IBLOCK_SECTION_ID" => $request->getPost("section"), "!=ID" => $request->getPost("hidden_items")]
                ])->fetchAll();

                $arCirc = $request->getPost("circulations");
                $skuProps = $request->getPost("sku_props");

                if(array_key_exists('AROMAT_OBSHCHIY', $skuProps)){
                    $hlID = 14;
                    $arrAromats = array();
                    $hlblock = HL\HighloadBlockTable::getById($hlID)->fetch();
                    $entity = HL\HighloadBlockTable::compileEntity($hlblock);
                    $entityData = $entity->getDataClass();
                    $iconsAromatData = $entityData::getList(array(
                        "select" => array("UF_*"),
                        "filter" => array()
                    ))->fetchAll();
                    foreach ($iconsAromatData as $aromat){
                        $arrAromats[$aromat['UF_ID_SKU']] = CFile::GetPath($aromat["UF_IMAGE"] ? $aromat["UF_IMAGE"] : $iconsAromatData[6]["UF_IMAGE"]);
                    }
                }

                $filter = array('ID', 'IBLOCK_ID', 'NAME', 'CODE', 'PARENT_ID', 'ACTIVE', 'SORT');
                $colorsProp = getTsvetH();
                $hiddenItems = $request->getPost("hidden_items");

                if(is_array($skuProps) && !empty($skuProps)){
                    foreach ($skuProps as $prop){
                        $filter[] = 'PROPERTY_' . $prop['CODE'];
                    }
                }

                foreach ($arItems as $key => $item) {
                    $temp = CCatalogSKU::getOffersList($item['ID'], 124, array('ACTIVE' => 'Y'), $filter, array());

                    if(!empty($arItems[$key]['DETAIL_PICTURE'])){
                        $arItems[$key]['DETAIL_PICTURE'] = CFile::GetPath($arItems[$key]['DETAIL_PICTURE']);
                    } else { $arItems[$key]['DETAIL_PICTURE'] = '/bitrix/templates/enext_mixon/components/bitrix/catalog.section.list/.default/img/no-img.png'; }

                    $arItems[$key]['SKU'] = $temp[$item['ID']];
                    $temp = reset($temp[$item['ID']]);
                    $arItems[$key]['FIRST_SKU_ID'] = $temp['ID'];
                    unset($temp);

                    foreach ($arItems[$key]['SKU'] as $keySku => $sku) {

                        $arItems[$key]['SKU'][$keySku]['PRICE'] = priceByConstructorMixon($keySku, $arCirc[$item['PROPERTY_TIP_TIRAZHA_VALUE']]);

                        if(is_array($skuProps) && !empty($skuProps)){
                            foreach ($skuProps as $prop){
                                if($prop['CODE'] == 'TSVET' && !empty($arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'])){
                                    $arItems[$key]['SKU_PROPERTY'][$prop['CODE']][$colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['ID']] = array(
                                        'ID' => $colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['ID'],
                                        'VALUE' => $colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['UF_NAME'],
                                        'NAME_PROP' => $prop['NAME'],
                                        'IMAGE' => $colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['UF_FILE'],
                                        'SORT' => $colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['UF_SORT']
                                    );

                                    $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID'] = $colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['ID'];
                                    $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'] = $colorsProp[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE']]['UF_NAME'];

                                    unset($arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE_ID']);
                                }elseif($prop['CODE'] == 'AROMAT_OBSHCHIY' && !empty($arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'])){
                                    $arItems[$key]['SKU_PROPERTY'][$prop['CODE']][$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID']] = array(
                                        'ID' => $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID'],
                                        'NAME_PROP' => $prop['NAME'],
                                        'VALUE' => $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'],
                                        'IMAGE' => $arrAromats[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID']] ? $arrAromats[$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID']] : CFile::GetPath($iconsAromatData[6]["UF_IMAGE"]),
                                        'SORT' => $arItems[$key]['SKU'][$keySku]['SORT']
                                    );
                                    unset($arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE_ID']);
                                }else{
                                    if(!empty($arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'])){
                                        $arItems[$key]['SKU_PROPERTY'][$prop['CODE']][$arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID']] = array(
                                            'ID' => $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID'],
                                            'NAME_PROP' => $prop['NAME'],
                                            'VALUE' => $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'],
                                            'SORT' => $arItems[$key]['SKU'][$keySku]['SORT']
                                        );
                                        unset($arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE_ID']);
                                    }else{
                                        unset(
                                            $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE'],
                                            $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_VALUE_ID'],
                                            $arItems[$key]['SKU'][$keySku]['PROPERTY_'.$prop['CODE'].'_ENUM_ID'],
                                        );
                                    }
                                }
                            }
                        }
                    }
                    $result[] = $arItems[$key];
                }
            }catch (Exception $err){vlog('Ошибка в конструкторе'.$err);}
        break;
        case "selectServices":
            $arItems = ElementCatalogMixonTable::getList([
                'select' => ["ID", "NAME", "SORT", "PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_" => "NAZVANIE_DLYA_KONSTRUKTORA"],
                'filter' => ["IBLOCK_ID" => 124, "ACTIVE" => "Y", "IBLOCK_SECTION_ID" => $request->getPost("section")]
            ])->fetchAll();

            foreach ($arItems as $key => $item) {
                $arItems[$key]['PRICE'] = priceByConstructorMixon($item['ID'], false, true);
                $result[$arItems[$key]['ID']] = $arItems[$key];
            }
        break;
        case "getBasket":
            try{
                $result = getBasket();
            }catch (Exception $err){
                $error = true;
                $ermess = $err->getMessage();
            }
        break;
        case "addToBasket":
            if(empty($request->getPost("productID"))) { $error = true; $ermess = 'addToBasket: Не задан идентификатор товара'; break; }
            if(empty($request->getPost("productName"))) { $error = true; $ermess = 'addToBasket: Не передано имя товара'; break; }
            if(empty($request->getPost("quantity"))) { $error = true; $ermess = 'addToBasket: Не задано количество товара'; break; }
            if(empty($request->getPost("props"))) { $error = true; $ermess = 'addToBasket: Не переданы свойства товара'; break; }
            if(empty($request->getPost("circ"))) { $error = true; $ermess = 'addToBasket: Не передан тираж товара'; break; }
            if(empty($request->getPost("services"))) { $error = true; $ermess = 'addToBasket: Не переданы варианты услуг'; break; }

            try {
                $basket = Basket::loadItemsForFUser(Fuser::getId(), Context::getCurrent()->getSite());
                $services = $request->getPost("services");
                $propsItem = $request->getPost("props");
                $circItem = $request->getPost("circ");
                $productName = $request->getPost("productName");
                $properties = array();
                $itemsQuant = getSettingField('UF_QUANT_SERVICES') ? getSettingField('UF_QUANT_SERVICES') : array();

                //*** формирование свойств НАЧАЛО ***//
                foreach ($propsItem as $key => $prop){
                    $properties['PROP_' . $key] = array(
                        'NAME' => $prop['VAL']['NAME_PROP'],
                        'CODE' => 'PROP_' . $key,
                        'VALUE' => $prop['VAL']['VALUE'],
                        'SORT' => $prop['VAL']['SORT']
                    );
                }

                unset($key);
                //*** формирование свойств КОНЕЦ***//

                //*** имя товара НАЧАЛО ***//
                $properties['PRODUCT_NAME'] = array(
                    'NAME' => 'Название товара',
                    'CODE' => 'PRODUCT_NAME',
                    'VALUE' => $productName
                );
                //*** имя товара КОНЕЦ ***//

                //*** формирование тиража НАЧАЛО ***//
                $properties['PROP_CIRC'] = array(
                    'NAME' => 'Тираж',
                    'CODE' => 'PROP_CIRC',
                    'VALUE' => $circItem['NAME']
                );
                //*** формирование тиража КОНЕЦ ***//

                //*** формирование услуг для позиции НАЧАЛО ***//
                if(!empty($request->getPost("servicesItem"))){
                    $servicesItem = $request->getPost("servicesItem");

                    foreach ($services as $key => $service){
                        foreach ($service as $idServ => $serv){
                            if(!empty($servicesItem[$key]) && !empty($servicesItem[$key][$idServ])){

                                //*** Если в переданном товаре есть эта услуга то формируем массив и проверяем есть ли она уже в корзине НАЧАЛО ***//
                                $properties['SERVICE_' . $idServ] = array(
                                    'NAME' => $serv['PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE'] ? $serv['PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE'] : $serv['NAME'],
                                    'CODE' => 'SERVICE_' . $idServ,
                                    'VALUE' => 'Да',
                                    'SORT' => $serv['SORT']
                                );

                                //*** Если услуга в корзине есть увеличиваем количество если нет добавляем в корзину НАЧАЛО ***//
                                if($itemProp = $basket->getExistsItem('catalog', $idServ)){
                                    if(array_search($idServ, $itemsQuant) !== false)
                                        $itemProp->setField('QUANTITY', $itemProp->getQuantity() + $request->getPost("quantity"));
                                    else
                                        $itemProp->setField('QUANTITY', $itemProp->getQuantity() + 1);
                                }else{
                                    $itemProp = $basket->createItem('catalog', $idServ);
                                    if(array_search($idServ, $itemsQuant) !== false){
                                        $itemProp->setFields(array(
                                            'QUANTITY' => $request->getPost("quantity"),
                                            'CURRENCY' => CurrencyManager::getBaseCurrency(),
                                            'LID' => Context::getCurrent()->getSite(),
                                            'PRODUCT_PROVIDER_CLASS' => 'CCatalogProductProvider'
                                        ));
                                    }else{
                                        $itemProp->setFields(array(
                                            'QUANTITY' => 1,
                                            'CURRENCY' => CurrencyManager::getBaseCurrency(),
                                            'LID' => Context::getCurrent()->getSite(),
                                            'PRODUCT_PROVIDER_CLASS' => 'CCatalogProductProvider'
                                        ));
                                    }
                                }
                                //*** Если услуга в корзине есть увеличиваем количество если нет добавляем в корзину КОНЕЦ ***//

                                //*** Если в переданном товаре есть эта услуга то формируем массив и проверяем есть ли она уже в корзине КОНЕЦ ***//
                            }else{
                                //*** Если услуга не выбрана просто добавляем в свойство корзины для вывода пользователю НАЧАЛО ***//
                                $properties['SERVICE_' . $idServ] = array(
                                    'NAME' => $serv['PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE'] ? $serv['PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE'] : $serv['NAME'],
                                    'CODE' => 'SERVICE_' . $idServ,
                                    'VALUE' => 'Нет',
                                    'SORT' => $serv['SORT']
                                );
                                //*** Если услуга не выбрана просто добавляем в свойство корзины для вывода пользователю КОНЕЦ ***//
                            }
                        }
                    }
                }else{
                    foreach ($services as $key => $service){
                        foreach ($service as $idServ => $serv){
                            $properties['SERVICE_' . $idServ] = array(
                                'NAME' => $serv['PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE'] ? $serv['PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE'] : $serv['NAME'],
                                'CODE' => 'SERVICE_' . $idServ,
                                'VALUE' => 'Нет',
                                'SORT' => $serv['SORT']
                            );
                        }
                    }
                }
                unset($itemProp);
                //*** формирование услуг для позиции КОНЕЦ ***//

                //*** Проверка выбранной позиции на наличие в корзине, сначало нужно её удалить также удалить свойства и услуги потом добавлять заного если этой позиции нет то просто добавляем НАЧАЛО ***//

                $itemsCollections = $basket->getBasketItems();
                if(count($itemsCollections) > 0) {
                    foreach ($itemsCollections as $item) {
                        if($item->getProductId() == $request->getPost("productID")) {
                            //*** Если позиция найдена удаляем её и услуги привязанные к ней НАЧАЛО ***//
                            $basketPropertyCollection = $item->getPropertyCollection();
                            foreach ($basketPropertyCollection as $basketProperty) {
                                if($basketProperty->getField('VALUE') == 'Да') {
                                    $explode = explode('_', $basketProperty->getField('CODE'));
                                    if($itemProp = $basket->getExistsItem('catalog', $explode[1])) {
                                        if(array_search($explode[1], $itemsQuant) !== false) {
                                            if ($itemProp->getQuantity() == $request->getPost("quantity")) {
                                                $itemProp->delete();
                                                $itemProp->save();
                                            } else {
                                                $itemProp->setField('QUANTITY', $itemProp->getQuantity() - $request->getPost("quantity"));
                                                $itemProp->save();
                                            }
                                        }else {
                                            if ($itemProp->getQuantity() == 1) {
                                                $itemProp->delete();
                                                $itemProp->save();
                                            } else {
                                                $itemProp->setField('QUANTITY', $itemProp->getQuantity() - 1);
                                                $itemProp->save();
                                            }
                                        }
                                    }
                                }
                            }
                            $item->delete();
                            unset($item);
                            //*** Если позиция найдена удаляем её и услуги привязанные к ней КОНЕЦ ***//
                        }
                    }
                    //*** Добавляем эту позицию по новой НАЧАЛО ***//
                    $item = $basket->createItem('catalog', $request->getPost("productID"));
                    $item->setFields(array(
                        'QUANTITY' => $request->getPost("quantity"),
                        'CURRENCY' => CurrencyManager::getBaseCurrency(),
                        'LID' => Context::getCurrent()->getSite(),
                        'PRODUCT_PROVIDER_CLASS' => 'CCatalogProductProvider'
                    ));

                    if(isset($properties)) {
                        $basketPropertyCollection = $item->getPropertyCollection();
                        $basketPropertyCollection->setProperty($properties);
                        $item->save();
                    }

                    $basket->save();
                    //*** Добавляем эту позицию по новой КОНЕЦ ***//

                }else{
                    $item = $basket->createItem('catalog', $request->getPost("productID"));
                    $item->setFields(array(
                        'QUANTITY' => $request->getPost("quantity"),
                        'CURRENCY' => CurrencyManager::getBaseCurrency(),
                        'LID' => Context::getCurrent()->getSite(),
                        'PRODUCT_PROVIDER_CLASS' => 'CCatalogProductProvider'
                    ));

                    if(isset($properties)) {
                        $basketPropertyCollection = $item->getPropertyCollection();
                        $basketPropertyCollection->setProperty($properties);
                        $item->save();
                    }
                    $basket->save();
                }
                //*** Проверка выбранной позиции на наличие в корзине, сначало нужно её удалить также удалить свойства и услуги потом добавлять заного если этой позиции нет то просто добавляем КОНЕЦ ***//

                $result = getBasket($services);
            }catch (Exception $err){
                $error = true;
                $ermess = $err->getMessage();
            }
        break;
        case "delItemToBasket":
            if(empty($request->getPost("productID"))) { $error = true; $ermess = 'delItemToBasket: Не задан идентификатор товара'; break; }

            $basket = Basket::loadItemsForFUser(Fuser::getId(), Context::getCurrent()->getSite());
            $services = $request->getPost("services");
            $search = false;

            $itemsCollections = $basket->getBasketItems();

            $itemsQuant = getSettingField('UF_QUANT_SERVICES') ? getSettingField('UF_QUANT_SERVICES') : array();

            foreach ($itemsCollections as $item){
                if($item->getProductId() == $request->getPost("productID")) {
                    //*** Если позиция найдена удаляем её и услуги привязанные к ней НАЧАЛО ***//
                    $basketPropertyCollection = $item->getPropertyCollection();
                    foreach ($basketPropertyCollection as $basketProperty) {
                        if($basketProperty->getField('VALUE') == 'Да') {
                            $explode = explode('_', $basketProperty->getField('CODE'));

                            if($itemProp = $basket->getExistsItem('catalog', $explode[1])) {
                                if(array_search($explode[1], $itemsQuant) !== false) {
                                    if ($itemProp->getQuantity() == $item->getQuantity()) {
                                        $itemProp->delete();
                                        $itemProp->save();
                                    } else {
                                        $itemProp->setField('QUANTITY', $itemProp->getQuantity() - $item->getQuantity());
                                        $itemProp->save();
                                    }
                                }else {
                                    if ($itemProp->getQuantity() == 1) {
                                        $itemProp->delete();
                                        $itemProp->save();
                                    } else {
                                        $itemProp->setField('QUANTITY', $itemProp->getQuantity() - 1);
                                        $itemProp->save();
                                    }
                                }
                            }
                        }
                    }

                    $result['message'] = 'Товар [' . $item->getProductId() . '] ' . $item->getField('NAME') . 'удалён';

                    $item->delete();
                    $basket->save();

                    $result['basket'] = getBasket($services);
                    unset($item);
                    $search = true;
                    //*** Если позиция найдена удаляем её и услуги привязанные к ней КОНЕЦ ***//
                    break;
                }
            }
            if($search) break;
            $error = true;
            $ermess = 'Товара [' . $request->getPost("productID") . '] - нет в корзине';
        break;
        case 'createOrder':
            if (!Loader::IncludeModule('sale')){
                $error = true;
                $ermess = 'Ошибка модуля магазина';
                break;
            }
            if(empty($request->getPost("form"))) { $error = true; $ermess = 'createOrder: Не переданы данные формы'; break; }
            $dataForm = $request->getPost("form");

            foreach ($dataForm as $field){
                switch ($field['name']){
                    case 'FIO':
                        $fio = strip_tags($field['value']);
                        $fio = htmlspecialchars($fio);
                        break;
                    case 'REGION':
                        $city = strip_tags($field['value']);
                        $city = htmlspecialchars($city);
                    break;
                    case 'MAIL':
                        $email = strip_tags($field['value']);
                        $email = htmlspecialchars($email);
                    break;
                    case 'ADRESS':
                        $adress = strip_tags($field['value']);
                        $adress = htmlspecialchars($adress);
                    break;
                    case 'TEL':
                        $phone = strip_tags($field['value']);
                        $phone = htmlspecialchars($phone);
                    break;
                    case 'DELIVERY':
                        $delivery = $field['value'];
                    break;
                    case 'PAY':
                        $pay = $field['value'];
                    break;
                }
            }

            if(empty($fio))     { $error = true; $ermess = 'createOrder: Не передано поле ФИО';     break; }
            if(empty($city))    { $error = true; $ermess = 'createOrder: Не передано поле РЕГИОН';  break; }
            if(empty($email))   { $error = true; $ermess = 'createOrder: Не передано поле ПОЧТА';   break; }
            if(empty($adress))  { $error = true; $ermess = 'createOrder: Не передано поле АДРЕСС';  break; }
            if(empty($phone))   { $error = true; $ermess = 'createOrder: Не передано поле ТЕЛЕФОН'; break; }

            //***  Подготавливаем создание сделки в Б24 НАЧАЛО ***//
            require_once ($_SERVER["DOCUMENT_ROOT"].'/bitrix/php_interface/lib/webhooks_B24/class.php');
            $HOOK_B24 = new extreme_B24;
            $C_FIELD = array(
                'ASSIGNED' => 31011,
                'THEME' => 'Заказ из конструктора MIXON - ' . $fio,
                'NAME' => $fio,
                'PHONE' => $phone,
                'MAIL' => $email
            );
            //***  Подготавливаем создание сделки в Б24 КОНЕЦ ***//


            $siteId = Context::getCurrent()->getSite();

            $currencyCode = Option::get('sale', 'default_currency', 'RUB');

            if($USER->IsAuthorized()){

                $userId = $USER->GetID();

            }else{

                $user = UserTable::getList(array(
                    'filter' => array(
                        '=EMAIL' => $email,
                    ),
                    'limit'=>1,
                    'select'=>array('*')
                ))->fetch();

                if(!empty($user)){
                    $userId = $user['ID'];
                } else {
                    $login = explode("@", $email);
                    $USER->Register(
                        $login[0],
                        $fio,
                        "",
                        $email,
                        $email,
                        $email
                    );
                    $userId = $USER->GetID();
                    //$userId = CSaleUser::GetAnonymousUserID();
                }
            }

            $order = Order::create($siteId, $userId);

            $order->setPersonTypeId(1);

            $basket = Basket::loadItemsForFUser(Fuser::getId(), $siteId)->getOrderableItems();

            $order->setBasket($basket);

            //*** Доставка НАЧАЛО ***//
            $shipmentCollection = $order->getShipmentCollection();
            $shipment = $shipmentCollection->createItem();
            $service = Delivery\Services\Manager::getById($delivery);
            $shipment->setFields(array(
                'DELIVERY_ID' => $service['ID'],
                'DELIVERY_NAME' => $service['NAME'],
            ));
            $shipmentItemCollection = $shipment->getShipmentItemCollection();
            foreach ($order->getBasket() as $item)
            {
                $shipmentItem = $shipmentItemCollection->createItem($item);
                $shipmentItem->setQuantity($item->getQuantity());
            }
            //*** Доставка КОНЕЦ ***//

            //*** Оплата НАЧАЛО ***//
            $paymentCollection = $order->getPaymentCollection();
            $payment = $paymentCollection->createItem();
            $paySystemService = PaySystem\Manager::getObjectById($pay);
            $payment->setFields(array(
                'PAY_SYSTEM_ID' => $paySystemService->getField("PAY_SYSTEM_ID"),
                'PAY_SYSTEM_NAME' => $paySystemService->getField("NAME"),
            ));
            //*** Оплата КОНЕЦ ***//

            $order->doFinalAction(true);
            $propertyCollection = $order->getPropertyCollection();

            $fioProperty = getPropertyByCode($propertyCollection, 'FIO');
            $fioProperty->setValue($fio);

            $emailProperty = getPropertyByCode($propertyCollection, 'EMAIL');
            $emailProperty->setValue($email);

            $phoneProperty = getPropertyByCode($propertyCollection, 'PHONE');
            $phoneProperty->setValue($phone);

            $cityProperty = getPropertyByCode($propertyCollection, 'CITY');
            $cityProperty->setValue($city);

            $adressProperty = getPropertyByCode($propertyCollection, 'ADDRESS');
            $adressProperty->setValue($adress);

            $ordAdressProperty = getPropertyByCode($propertyCollection, 'ORDER_ADRESS');
            $ordAdressProperty->setValue('MIXON_CONSTRUCTOR');

            $order->setField('CURRENCY', $currencyCode);
            $order->setField('USER_DESCRIPTION', '');
            $order->save();

            $result = $order->GetId();

            if($result){
                $HOOK_B24::addContact($C_FIELD, true);
                $result = '<div class="tittle-answer">Заказ <b>' . $result . '</b><br />успешно создан.</div><div class="subtittle-answer">В ближайшее время с Вами свяжется<br />
наш менеджер, что бы уточнить информацию.</div>';
            } else {
                $error = true;
                $ermess = '<div class="tittle-answer">Ошибка создания заказа</div><div class="subtittle-answer">Приносим свои извинения, что то пошло не так.<br />Попробуйте обновить страницу или напишите нам<br />и наши специалисты помогут Вам.</div>';
            }

        break;
    }

    if($error) { vlog($ermess); }

    Base::sendJsonAnswer(array(
        "error" => $error,
        "errorMessage" => $ermess,
        "result" => $result
    ));
}else {
    Base::sendJsonAnswer(array(
        "error" => true,
        "errorMessage" => 'Обращение к скрипту не по Ajax',
        "result" => $result
    ));
}