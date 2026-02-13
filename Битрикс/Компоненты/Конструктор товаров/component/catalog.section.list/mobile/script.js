(function(window){
    'use strict';

    if(window.JCProductConstructor)
        return;

    window.JCProductConstructor = function(arParams) {
        this.ajaxURL = '/ajax/constructor-ajax.php';
        this.IDS = arParams.ids;
        this.MESS = arParams.mess;
        this.CIRC = arParams.circulations;
        this.SKU_PROPS = arParams.skuprops;
        this.SETTINGS = arParams.settings;
        this.SETTINGS.UF_OBJECT_SETTINGS = JSON.parse(this.SETTINGS.UF_OBJECT_SETTINGS);
        this.SITE_TEMPLATE_PATH = arParams.template_path;

        this.stepsBlocks = BX(this.IDS.rootBlock.leftBlock.main).querySelectorAll('div.step-block');
        //this.stepsLabel = BX(this.IDS.rootBlock.steps.main).querySelectorAll('div');

        this.arResult = arParams.arResult;
        this.headers = document.querySelectorAll('header');
        this.buttons = document.querySelectorAll('div.m_button');
        this.deliveri = document.querySelectorAll('div.delivery-item');
        this.pay = document.querySelectorAll('div.pay-item');
        this.itemsBySectionRes = []; //товары из разделов
        this.itemsByDizainRes = []; //Услуги дизайна
        this.itemsByUpakRes = []; //Услуги упаковки
        this.itemsByUrRes = []; //Юридические услуги
        this.selectCirc = ''; //Выбранный тираж
        this.selectSection = ''; //Список разделов
        this.selectItems = ''; //Список товаров в разделе
        this.selectItem = []; //Выбранный товар
        this.selectSku = []; //Выбранное предложение
        this.popupMessage = {} //Окно уведомлений
        this.finalSelectsParams = { //Итоговый объект выбранных параметров товара для перемещения в корзину
            PROPS: {},
            DIZAIN: {},
            UPAKOVKA: {},
            URID: {}
        };
        this.finalSelectsPrices = { //Итоговый объект с ценами
            FINAL_PRICE_ITEM: 0,
            FINAL_PRICE_DIZAIN: 0,
            FINAL_PRICE_UPAK: 0,
            FINAL_PRICE_UR: 0
        }
        this.basketObj = {} //Итоговый объект для корзины
        this.price = 0; //Цена товара
        this.volUnits = this.SETTINGS.UF_OBJECT_SETTINGS.VOLUMES.split(',') //Единицы измерения объёма
        this.reduction = Number(this.SETTINGS.UF_OBJECT_SETTINGS.REDUCTION) === 0 ? 512 : Number(this.SETTINGS.UF_OBJECT_SETTINGS.REDUCTION); //Количество символов для обрезки текста
        this.maxCirc = Number(this.SETTINGS.UF_OBJECT_SETTINGS.REDUCTION) === 0 ? 5000 : Number(this.SETTINGS.UF_OBJECT_SETTINGS.MAX_CIRC); //Максимальный тираж
        this.flagSteps = { //Флаги запоминания/сброса этапов
            'first': false,
            'subFirst': false,
            'second': false,
            'third': false,
            'fourth': false
        };
        this.timeScroll = 400; //Задержка перед перелистыванием к заголовку

        this.log = function (m) {if(this.SETTINGS.UF_OBJECT_SETTINGS.LOGS === 'Y')console.log(m)}

        this.init();
    };
    window.JCProductConstructor.prototype = {
        init: function() {
            this.log('init');

            let headersList = Array.from(this.headers),
                buttonsList = Array.from(this.buttons),
                deliveries = Array.from(this.deliveri),
                pay = Array.from(this.pay);

            this.createAllSteps();

            BX.bind(BX(this.IDS.rootBlock.buttons.order), 'click', BX.proxy(this.setOrder, this));

            BX.bind(BX(this.IDS.rootBlock.firstStep.sections), 'click', BX.proxy(this.openCloseMenu));
            BX.bind(BX(this.IDS.rootBlock.firstStep.items), 'click', BX.proxy(this.openCloseMenu));

            BX.bind(BX('switch'), 'click', BX.proxy(this.clickSwitch, this));

            BX.bind(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.circulationList.circuInput), 'change', BX.proxy(this.changeInputCirc, this));

            for (var keyPD in this.IDS.rootBlock.subfirstStep.skuParamsDom) {
                BX.bind(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[keyPD].params), 'click', BX.proxy(this.openCloseMenu));
            }

            for(var keyH in headersList){
                BX.bind(BX(headersList[keyH]), 'click', BX.proxy(this.clickHeader, this));
            }

            for(var keyH in buttonsList){
                BX.bind(BX(buttonsList[keyH]), 'click', BX.proxy(this.clickButtons, this));
            }

            for(var keyH in deliveries){
                BX.bind(BX(deliveries[keyH]), 'click', BX.proxy(this.setDeliveri, this));
            }

            for(var keyH in pay){
                BX.bind(BX(pay[keyH]), 'click', BX.proxy(this.setPay, this));
            }

            BX.bind(BX(document), 'click', BX.proxy(this.closeMenu, this));

            $("#block-basket-scroll").mCustomScrollbar({ theme: "light-thick" });
            $("#" + this.IDS.rootBlock.firstStep.scrollSList).mCustomScrollbar({ theme: "light-thick", setWidth: '100%' });
            $("#" + this.IDS.rootBlock.subfirstStep.skuParamsDom.fragranceList.scrollBlock).mCustomScrollbar({ theme: "light-thick", setWidth: '100%' });
            $("#"+this.IDS.rootBlock.leftBlock.main).accordion({
                heightStyle: "content",
                header: "header",
                active: 0
            });
            $( "header#ui-id-6" ).addClass("ui-state-disabled");
            $( "header#ui-id-7" ).addClass("ui-state-disabled");

            this.scrollTo(this.IDS.rootDom);

            this.popupWindow();
        },
        createAllSteps: function(){

            this.createStepFirst(this.arResult.SECTIONS);
            this.createStepSubFirst();

            this.createStepSecond();
            this.createStepThird();
            this.createStepFourth();
        },
        scrollTo: function(dom){
            $("html, body").animate({
                scrollTop: $('#' + dom).offset().top
            }, {
                duration: 300,
                easing: "linear"
            });
        },
        reinit: function (){
            this.log('reinit');

            this.flagSteps = {
                'first': false,
                'subFirst': false,
                'second': false,
                'third': false,
                'fourth': false
            };

            this.finalSelectsPrices = {
                FINAL_PRICE_ITEM: 0,
                FINAL_PRICE_DIZAIN: 0,
                FINAL_PRICE_UPAK: 0,
                FINAL_PRICE_UR: 0
            };

            this.finalSelectsParams = {
                PROPS: {},
                DIZAIN: {},
                UPAKOVKA: {},
                URID: {}
            };

            this.itemsBySectionRes = [];
            this.itemsByDizainRes = [];
            this.itemsByUpakRes = [];
            this.itemsByUrRes = [];
            this.selectCirc = '';
            this.selectSection = '';
            this.selectItems = '';
            this.selectItem = [];
            this.selectSku = [];

            BX.cleanNode(BX(this.IDS.rootBlock.secondStep.servicesList));
            BX.cleanNode(BX(this.IDS.rootBlock.thirdStep.servicesList));
            BX.cleanNode(BX(this.IDS.rootBlock.fourthStep.servicesList));

            $("#" + this.IDS.rootBlock.firstStep.scrollSList).mCustomScrollbar("destroy");

            BX.cleanNode(BX(this.IDS.rootBlock.firstStep.scrollSList), true);
            BX.cleanNode(BX(this.IDS.rootBlock.firstStep.iList), true);

            this.addSpiner(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-section'));
            this.addSpiner(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'));

            BX.adjust(BX(this.IDS.rootBlock.secondStep.servicesPrice).querySelector('span'), { text: '0 руб.' });
            BX.adjust(BX(this.IDS.rootBlock.thirdStep.servicesPrice).querySelector('span'), { text: '0 руб.' });
            BX.adjust(BX(this.IDS.rootBlock.fourthStep.servicesPrice).querySelector('span'), { text: '0 руб.' });
            this.setPriceLabel();

            this.createAllSteps();

        },
        clickHeader: function (e){
            this.log('clickHeader');

            switch (BX(e.target).id) {
                case 'ui-id-1':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-1');
                break;
                case 'ui-id-2':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-2');
                    this.createStepSubFirst();
                break;
                case 'ui-id-3':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-3');
                    this.createStepSecond();
                break;
                case 'ui-id-4':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-4');
                    this.createStepThird();
                break;
                case 'ui-id-5':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-5');
                    this.createStepFourth();
                break;
                case 'ui-id-6':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-6');
                    this.createStepFifth();
                break;
                case 'ui-id-7':
                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-7');
                    this.createStepSixth();
                break;
            }

        },
        clickButtons: function(e){
            this.log('clickButtons');

            switch (BX(e.target).id) {
                case 'button_1':
                    $('#ui-id-2').click();

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-2');

                    this.createStepSubFirst();
                break;
                case 'button_2':
                    $('#ui-id-3').click();

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-3');

                    this.createStepSecond();
                break;
                case 'button_3':
                    $('#ui-id-4').click();

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-4');

                    this.createStepThird();
                break;
                case 'button_4':
                    $('#ui-id-5').click();

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-5');

                    this.createStepFourth();
                break;
                case 'button_5':
                    $('#ui-id-6').removeClass("ui-state-disabled").click().addClass("ui-state-disabled");

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-6');

                    this.createStepFifth();
                break;
                case 'button_6_to_order':
                    $('#ui-id-7').removeClass("ui-state-disabled").click().addClass("ui-state-disabled");

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-7');

                    this.createStepSixth();
                break;
                case 'button_6_reopen':
                    $('#ui-id-1').click();

                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-1');

                    this.reinit();
                break;
            }
        },
        createStepFirst: function(sections) {
            this.log('createStepFirst');
            var hideSect, i, firstSection = true, scrollContainer;

            scrollContainer = BX.create('DIV', {
                props: {
                    id: this.IDS.rootBlock.firstStep.scrollSList
                }
            });

            this.selectSection = BX.create('UL', {
                props: {
                    id: this.IDS.rootBlock.firstStep.sList
                }
            });

            for (var i = 0; i < sections.length; ++i) {
                if(this.SETTINGS.UF_HIDE_SECTIONS.filter(function (val) {
                    return val == sections[i].ID;
                }).length === 0) {
                    BX.append(
                        BX.create('LI', {
                            text: sections[i].NAME,
                            props: {
                                id: sections[i].ID,
                                className: firstSection ? 'active' : ''
                            },
                            events: {
                                click: BX.proxy(this.selectSectionList, this)
                            },
                        }), this.selectSection);
                    if (firstSection) {
                        BX.adjust(BX(this.IDS.rootBlock.firstStep.sections).querySelector('.label-section'), {text: sections[i].NAME});
                    }
                    firstSection = firstSection ? !firstSection : false;
                }
            }

            BX.append(this.selectSection, scrollContainer);

            BX.append(scrollContainer, BX(this.IDS.rootBlock.firstStep.sections));

            $("#" + this.IDS.rootBlock.firstStep.scrollSList).mCustomScrollbar({ theme: "light-thick", setWidth: '100%' });

            this.selectItems = BX.create('UL', {
                props: {
                    id: this.IDS.rootBlock.firstStep.iList
                }
            });

            this.itemsBySection(false, true);

            this.itemsBySectionRes = this.getSortArrayItems(this.itemsBySectionRes);

            if(this.itemsBySectionRes.length > 0){
                for (i = 0; i < this.itemsBySectionRes.length; ++i) {
                    BX.append(
                        BX.create('LI', {
                            text: this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                                this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE :
                                this.itemsBySectionRes[i].NAME,
                            props: {
                                id: this.itemsBySectionRes[i].ID,
                                className: i === 0 ? 'active' : ''
                            },
                            events: {
                                click: BX.proxy(this.selectItemList, this)
                            },
                        }), this.selectItems);
                    if(i === 0) {
                        BX.adjust(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'), {
                            text: this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                                this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE :
                                this.itemsBySectionRes[i].NAME
                        });

                        this.setSelectItemSku(this.itemsBySectionRes[i], this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID]);

                        if("ERROR" in this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE) {
                            this.log(this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE.ERROR);
                            this.price = 0;
                        } else {
                            this.price = this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE.BASE_PRICE.PRICE;
                        }

                        this.setPriceItem(Number(this.price), Number(this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][0].QUANTITY));

                        this.setImg('first', this.itemsBySectionRes[i].DETAIL_PICTURE);
                        this.setImg('basket', this.itemsBySectionRes[i].DETAIL_PICTURE);
                    }
                }
                BX.append(this.selectItems, BX(this.IDS.rootBlock.firstStep.items));
            }else{
                BX.cleanNode(BX(this.IDS.rootBlock.firstStep.iList));
                BX.adjust(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'), {text: 'Нет товаров в разделе'});
            }

        },
        createStepSubFirst: function () {
            this.log('createStepSubFirst');

            if(!this.flagSteps.subFirst) {
                this.finalSelectsParams.PROPS = {};
                BX.adjust(BX(this.IDS.rootBlock.subfirstStep.itemName), {
                    text: this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                        this.textReduction(this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE) :
                        this.textReduction(this.selectItem.NAME)
                });

                this.finalSelectsParams.ITEM = this.selectItem.ID;
                this.finalSelectsParams.SKU = this.selectSku.ID

                BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.circulationList.circuInput).value = '';

                if (this.searchPropItem(this.SKU_PROPS['OBYEM_OBSHCHIY']['CODE'], this.selectItem.SKU_PROPERTY)) {
                    this.setVolumeList();
                    BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.volumeList.block));
                } else {
                    BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.volumeList.block));
                }

                if (this.searchPropItem(this.SKU_PROPS['AROMAT_OBSHCHIY']['CODE'], this.selectItem.SKU_PROPERTY)) {
                    this.setFragranceList();
                    BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.fragranceList.block));
                } else {
                    BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.fragranceList.block));
                }

                if (this.searchPropItem(this.SKU_PROPS['TSVET']['CODE'], this.selectItem.SKU_PROPERTY)) {
                    this.setColorList();
                    BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.colorList.block));
                } else {
                    BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.colorList.block));
                }

                if (this.searchPropItem(this.SKU_PROPS['IZGIB']['CODE'], this.selectItem.SKU_PROPERTY)) {
                    this.setIzgibList();
                    BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.izgib.block));
                } else {
                    BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.izgib.block));
                }

                if (this.searchPropItem(this.SKU_PROPS['DLINA']['CODE'], this.selectItem.SKU_PROPERTY)) {
                    this.setDlinaList();
                    BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.dlina.block));
                } else {
                    BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.dlina.block));
                }

                if (this.searchPropItem(this.SKU_PROPS['DIAMETR']['CODE'], this.selectItem.SKU_PROPERTY)) {
                    this.setDiametrList();
                    BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.diametr.block));
                } else {
                    BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.diametr.block));
                }

                this.setCirculationList();

                this.setImg('next', this.selectItem.DETAIL_PICTURE, this.IDS.rootBlock.subfirstStep.imgItem);

                this.flagSteps.subFirst = true;
            }
            return true;
        },
        createStepSecond: function () { //Услуги дизайна
            this.log('createStepSecond');

            BX.adjust(BX(this.IDS.rootBlock.secondStep.itemName), {
                text: this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                    this.textReduction(this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE) :
                    this.textReduction(this.selectItem.NAME)
            });

            this.setSelectsProps(BX(this.IDS.rootBlock.secondStep.selectsProps));

            this.setImg('next', this.selectItem.DETAIL_PICTURE, this.IDS.rootBlock.secondStep.imgItem);

            if(!this.flagSteps.second) {
                var data = {};

                data['action'] = 'selectServices';
                data['section'] = this.SETTINGS.UF_SECTION_DIZAIN;

                this.send(data, BX.delegate(function (data) {
                    if (!data.error) {
                        this.itemsByDizainRes = data.result;
                    }
                }, this), false);

                BX.append(this.getDomDizain(this.itemsByDizainRes, this.clickSwitchDizain), BX(this.IDS.rootBlock.secondStep.servicesList));
                this.flagSteps.second = true;
            }
            return true;
        },
        createStepThird: function () { //Услуги упаковки
            this.log('createStepThird');

            BX.adjust(BX(this.IDS.rootBlock.thirdStep.itemName), {
                text: this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                    this.textReduction(this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE) :
                    this.textReduction(this.selectItem.NAME)
            });

            this.setSelectsProps(BX(this.IDS.rootBlock.thirdStep.selectsProps));

            this.setImg('next', this.selectItem.DETAIL_PICTURE, this.IDS.rootBlock.thirdStep.imgItem);

            if(!this.flagSteps.third) {
                var data = {};

                data['action'] = 'selectServices';
                data['section'] = this.SETTINGS.UF_SECTION_UPAK;

                this.send(data, BX.delegate(function (data) {
                    if (!data.error) { this.itemsByUpakRes = data.result };
                }, this), false);

                BX.append(this.getDomUpakUr(this.itemsByUpakRes, this.clickSwitchUpak), BX(this.IDS.rootBlock.thirdStep.servicesList));
                this.flagSteps.third = true;
            }
            return true;
        },
        createStepFourth: function () { //Юридические услуги
            this.log('createStepFourth');

            BX.adjust(BX(this.IDS.rootBlock.fourthStep.itemName), {
                text: this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                    this.textReduction(this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE) :
                    this.textReduction(this.selectItem.NAME)
            });

            this.setSelectsProps(BX(this.IDS.rootBlock.fourthStep.selectsProps));

            this.setImg('next', this.selectItem.DETAIL_PICTURE, this.IDS.rootBlock.fourthStep.imgItem);

            if(!this.flagSteps.fourth) {
                var data = {};

                data['action'] = 'selectServices';
                data['section'] = this.SETTINGS.UF_SECTION_UR;

                this.send(data, BX.delegate(function (data) {
                    if (!data.error) { this.itemsByUrRes = data.result };
                }, this), false);

                BX.append(this.getDomUpakUr(this.itemsByUrRes, this.clickSwitchUr), BX(this.IDS.rootBlock.fourthStep.servicesList));

                this.flagSteps.fourth = true;
            }
            return true;
        },
        createStepFifth: function () {
            this.log('createStepFifth');

            var data = {}, basket = {}, error = false;
            data['action'] = "addToBasket";
            data['productID'] = this.finalSelectsParams.SKU;
            data['productName'] = this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ? this.selectItem.PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE : this.selectItem.NAME;
            data['quantity'] = this.finalSelectsParams.CIRC.QUANTITY;
            data['servicesItem'] = {
                'DIZAIN': this.finalSelectsParams.DIZAIN ? this.finalSelectsParams.DIZAIN : {},
                'UPAKOVKA': this.finalSelectsParams.UPAKOVKA ? this.finalSelectsParams.UPAKOVKA : {},
                'URID': this.finalSelectsParams.URID ? this.finalSelectsParams.URID : {}
            };
            data['services'] = {
                'DIZAIN': this.itemsByDizainRes,
                'UPAKOVKA': this.itemsByUpakRes,
                'URID': this.itemsByUrRes
            };
            data['props'] = this.finalSelectsParams.PROPS;
            data['circ'] = this.finalSelectsParams.CIRC;

            this.send(data, function (data) {
                if(data.error) { error = data.errorMessage;  }
                basket = data.result.basketUser;
            }, false);

            if(!error){ this.setBasketDOM(basket); }
            else { this.setBasketDOM(basket, error); }

        },
        createStepSixth: function () {
            this.log('createStepSixth');


        },
        delItemPopup: function (e) {
            this.log('delItemPopup');

            BX.cleanNode(BX(this.IDS.popup.content));

            BX.append(BX.create('DIV', {
                props: {
                    className: 'd-flex flex-column gap-5'
                },
                children: [
                    BX.create('DIV', {
                        html: 'Вы точно хотите<br />удалить товар из корзины?',
                        props: {
                            className: 'popup-text'
                        }
                    }),
                    BX.create('DIV', {
                        props: {
                            className: 'd-flex gap-3 justify-content-evenly popup-button-block'
                        },
                        children: [
                            BX.create('DIV', {
                                text: 'Удалить',
                                props: {
                                    className: 'button-yes d-flex justify-content-center align-items-center me-3'
                                },
                                events: {
                                    click: BX.proxy(function(){
                                        this.popupMessage.close();
                                        this.delItemBasket(BX(e.target).id);
                                    }, this)
                                }
                            }),
                            BX.create('DIV', {
                                text: 'Нет',
                                props: {
                                    className: 'button-no d-flex justify-content-center align-items-center'
                                },
                                events: {
                                    click: BX.proxy(function(){
                                        this.popupMessage.close();
                                    }, this)
                                }
                            })
                        ]
                    })
                ]
            }), BX(this.IDS.popup.content));

            this.popupMessage.show();

        },
        delItemBasket: function (id) {
            this.log('delItemBasket');

            var basket = {}, error = false, data = {};

            data['action'] = "delItemToBasket";
            data['productID'] = id;
            data['services'] = {
                'DIZAIN': this.itemsByDizainRes,
                'UPAKOVKA': this.itemsByUpakRes,
                'URID': this.itemsByUrRes
            };

            this.addSpinerBasket();

            this.send(data, function (data) {
                if(data.error) { error = data.errorMessage;  }
                basket = data.result.basket.basketUser;
            }, false);

            if(!error){ this.setBasketDOM(basket); }
            else { this.setBasketDOM(basket, error); }

        },
        openCloseMenu: function (e) {
            e.stopPropagation();
            var split = BX(this).id.split('_'), menu, lists_open = BX(document).querySelectorAll('.list-open');
            if(split.length === 2){
                menu = BX(this);
                if($(menu).hasClass('list-open')){
                    $(menu).removeClass('list-open');
                }else{
                    if(lists_open !== 0)
                        for (var i = 0; i < lists_open.length; ++i) {
                            $(lists_open[i]).removeClass('list-open');
                        }
                    $(menu).addClass('list-open');
                }
            }else{ console.error('Неверный ИД исходного элемента'); }
        },
        openListParam: function (e) {
            this.log('openListParam');

            BX.toggleClass(BX(BX(e.target).dataset['id'] + '_params'), 'open-list');
        },
        closeMenu: function (elem) {
            this.log('closeMenu');
            var lists_open = BX(document).querySelectorAll('.list-open');
            if(lists_open !== 0) {
                for (var i = 0; i < lists_open.length; ++i) {
                    BX.toggleClass(BX(lists_open[i]), "list-open");
                }
            }
        },
        itemsBySection: function () {
            this.log('itemsBySection');
            var data = {};

            data['action'] = 'selectItems';
            data['section'] = BX(this.IDS.rootBlock.firstStep.sList).querySelector('.active').id;
            data['circulations'] = this.CIRC;
            data['sku_props'] = this.SKU_PROPS;
            data['hidden_items'] = this.SETTINGS.UF_HIDE_ITEMS;
            data['hidden_sku'] = this.SETTINGS.UF_SKU_HIDDEN;

            this.send(data, BX.delegate(function (data) {
                if(!data.error){ this.itemsBySectionRes = data.result };
            }, this), false);
        },
        selectSectionList: function (e) {
            this.log('selectSectionList');

            var data = {}, i;

            this.addSpiner(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'));

            this.remActiveItemList(this.IDS.rootBlock.firstStep.sList);
            BX.adjust(BX(e.target), {props:{className: 'active'}});
            BX.adjust(BX(this.IDS.rootBlock.firstStep.sections).querySelector('.label-section'), {text: BX(e.target).textContent});

            data['action'] = 'selectItems';
            data['section'] = BX(e.target).id;
            data['circulations'] = this.CIRC;
            data['sku_props'] = this.SKU_PROPS;
            data['hidden_items'] = this.SETTINGS.UF_HIDE_ITEMS;
            data['hidden_sku'] = this.SETTINGS.UF_SKU_HIDDEN;
            
            this.send(data, BX.delegate(function (data) {
                if(!data.error){ this.itemsBySectionRes = data.result };
            }, this), false);

            this.itemsBySectionRes = this.getSortArrayItems(this.itemsBySectionRes);

            if(this.itemsBySectionRes.length > 0){
                BX.cleanNode(BX(this.IDS.rootBlock.firstStep.iList));
                for (i = 0; i < this.itemsBySectionRes.length; ++i) {
                    BX.append(
                        BX.create('LI', {
                            text: this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                                this.textReduction(this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE) :
                                this.textReduction(this.itemsBySectionRes[i].NAME),
                            props: {
                                id: this.itemsBySectionRes[i].ID,
                                className: i === 0 ? 'active' : ''
                            },
                            events: {
                                click: BX.proxy(this.selectItemList, this)
                            },
                        }), this.selectItems);
                    if(i===0) {
                        BX.adjust(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'), {
                            text: this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                                this.textReduction(this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE) :
                                this.textReduction(this.itemsBySectionRes[i].NAME)
                        });

                        this.setSelectItemSku(this.itemsBySectionRes[i], this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID]);

                        if("ERROR" in this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE) {
                            this.log(this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE.ERROR);
                            this.price = 0;
                        } else {
                            this.price = this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE.BASE_PRICE.PRICE;
                        }
                        this.setPriceItem(Number(this.price), Number(this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][0].QUANTITY));

                        this.setImg('first', this.itemsBySectionRes[i].DETAIL_PICTURE);
                    }
                }
                BX.append(this.selectItems, BX(this.IDS.rootBlock.firstStep.items));
            }else{
                BX.cleanNode(BX(this.IDS.rootBlock.firstStep.iList));
                BX.adjust(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'), {text: 'Нет товаров в разделе'});
            }
            this.flagSteps.subFirst = false;
        },
        selectItemList: function (e) {
            this.log('selectItemList');

            for (var i = 0; i < this.itemsBySectionRes.length; ++i) {
                if(this.itemsBySectionRes[i].ID === BX(e.target).id){

                    this.setSelectItemSku(this.itemsBySectionRes[i], this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID]);

                    this.remActiveItemList(this.IDS.rootBlock.firstStep.iList);
                    BX.toggleClass(BX(e.target), 'active');
                    if("ERROR" in this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE) {
                        this.log(this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE.ERROR);
                        this.price = 0;
                    } else {
                        this.price = this.itemsBySectionRes[i].SKU[this.itemsBySectionRes[i].FIRST_SKU_ID].PRICE.BASE_PRICE.PRICE;
                    }
                    this.setPriceItem(Number(this.price), Number(this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][0].QUANTITY));
                    BX.adjust(BX(this.IDS.rootBlock.firstStep.items).querySelector('.label-item'), {
                        text: this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE ?
                            this.itemsBySectionRes[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE :
                            this.itemsBySectionRes[i].NAME
                    });
                    this.setImg('first', this.itemsBySectionRes[i].DETAIL_PICTURE);
                }
            }
            this.flagSteps.subFirst = false;
        },
        selectListProps: function (e) {
            this.log('selectListProps');
            var click = (e.target.tagName == 'LI') ? BX(e.target) :  BX.findParent(BX(e.target), {"tag": "LI"}), //|| e.target.tagName === 'IMG'
                list = BX.findParent(click, {"tag": "ul"}) ?
                    BX.findParent(click, {"tag": "ul"}) :
                    BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.colorList.list),
                prop = list.dataset['prop'], label, inputCirc;

            if(!!prop){
                switch (prop) {
                    case 'CIRC':
                        this.log('prop - CIRC');
                        if(!BX.hasClass(click, 'active')){
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.circulationList.params);
                            inputCirc = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.circulationList.circuInput);

                            if(inputCirc.value)
                                inputCirc.value = '';

                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            this.setPriceItem(Number(this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][click.id].QUANTITY), this.selectSku.PRICE.CIRCE[click.id].PRICE);
                            this.setPriceOne(Number(this.selectSku.PRICE.CIRCE[click.id].PRICE), 't');
                            this.selectCirc = this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][click.id].NAME;
                            BX.adjust(label.querySelector('.label-circulation'), {text: this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][click.id].NAME});
                            this.finalSelectsParams[prop] = this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE][click.id];

                            //this.log(this.finalSelectsParams);
                        }

                    break;
                    case 'AROMAT_OBSHCHIY':
                        this.log('prop - AROMAT');
                        if(!BX.hasClass(click, 'active')){
                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.fragranceList.params);

                            BX.adjust(label.querySelector('.label-fragrance'), {html: click.innerHTML});

                            this.finalSelectsParams.PROPS[prop] = {ID: click.id, VAL: this.selectItem.SKU_PROPERTY[prop][click.id]};
                            this.setSelectItemSku();

                            this.log(this.finalSelectsParams.PROPS);
                        }
                    break;
                    case 'OBYEM_OBSHCHIY':
                        this.log('prop - OBYEM');
                        if(!BX.hasClass(click, 'active')){
                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.volumeList.params);

                            BX.adjust(label.querySelector('.label-volume'), {text: click.innerHTML});

                            this.finalSelectsParams.PROPS[prop] = {ID: click.id, VAL: this.selectItem.SKU_PROPERTY[prop][click.id]};
                            this.setSelectItemSku();

                            this.log(this.finalSelectsParams.PROPS);
                        }
                    break;
                    case 'TSVET':
                        this.log('prop - TSVET');
                        if(!BX.hasClass(click, 'active')){
                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.colorList.params);

                            BX.adjust(label.querySelector('.label-color'), {html: click.innerHTML});

                            this.finalSelectsParams.PROPS[prop] = {ID: click.id, VAL: this.selectItem.SKU_PROPERTY[prop][click.id]};
                            this.setSelectItemSku();

                            this.log(this.finalSelectsParams.PROPS);
                        }
                    break;
                    case 'DIAMETR':
                        this.log('prop - DIAMETR');
                        if(!BX.hasClass(click, 'active')){
                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.diametr.params);

                            BX.adjust(label.querySelector('.label-diametr'), {text: click.innerHTML});

                            this.finalSelectsParams.PROPS[prop] = {ID: click.id, VAL: this.selectItem.SKU_PROPERTY[prop][click.id]};
                            this.setSelectItemSku();

                            this.log(this.finalSelectsParams.PROPS);
                        }
                    break;
                    case 'DLINA':
                        this.log('prop - DLINA');
                        if(!BX.hasClass(click, 'active')){
                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.dlina.params);

                            BX.adjust(label.querySelector('.label-dlina'), {text: click.innerHTML});

                            this.finalSelectsParams.PROPS[prop] = {ID: click.id, VAL: this.selectItem.SKU_PROPERTY[prop][click.id]};
                            this.setSelectItemSku();

                            this.log(this.finalSelectsParams.PROPS);
                        }
                    break;
                    case 'IZGIB':
                        this.log('prop - IZGIB');
                        if(!BX.hasClass(click, 'active')){
                            this.remActiveItemList(list);
                            BX.adjust(click, {props:{className: 'active'}});
                            label = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.izgib.params);

                            BX.adjust(label.querySelector('.label-izgib'), {text: click.innerHTML});

                            this.finalSelectsParams.PROPS[prop] = {ID: click.id, VAL: this.selectItem.SKU_PROPERTY[prop][click.id]};
                            this.setSelectItemSku();

                            this.log(this.finalSelectsParams.PROPS);
                        }
                    break;
                }
            }else{
                this.log('Ошибка в data DOM элемента')
            }
        },
        changeInputCirc: function (e) {
            this.log('changeInputCirc');
            var value = Number(BX(e.target).value), i, range, objCirc = this.selectSku.PRICE.CIRCE, search = false;

            if(Number(value) > this.maxCirc) { value = BX(e.target).value = this.maxCirc; }
            if(Number(value) % 2 !== 0) { value = value + 1; BX(e.target).value = value; }

            if(value != ''){
                for(i = 0; i < objCirc.length; i++) {
                    if (objCirc.length > 1){
                        if (i == 0) {
                            if(value < objCirc[i].QUANTITY) {
                                BX(e.target).value = objCirc[i].QUANTITY;
                                search = !search;
                                break;
                            }
                            if(value == objCirc[i].QUANTITY) { search = true; break; }
                            if(value > Number(objCirc[i].QUANTITY)) {
                                if(value < Number(objCirc[i + 1].QUANTITY)){ search = !search; break; }
                            }
                        }
                        if(i > 0 && i < objCirc.length - 1){
                            if(value == objCirc[i].QUANTITY) { search = !search; break; }
                            if(value > objCirc[i].QUANTITY) {
                                if(value < objCirc[i + 1].QUANTITY){ search = !search; break; }
                            }
                        }
                        if (i == objCirc.length - 1) {
                            if(value == objCirc[i].QUANTITY) { search = !search; break; }
                            if(value > objCirc[i].QUANTITY) { search = !search; break; }
                        }
                    }else if(objCirc == 1){
                        if(value < objCirc[i].QUANTITY) {
                            BX(e.target).value = objCirc[i].QUANTITY;
                            search = !search;
                            break;
                        }
                        if(value == objCirc[i].QUANTITY) { search = !search; break; }
                        if(value > Number(objCirc[i].QUANTITY)) {
                            if(value < Number(objCirc[i + 1].QUANTITY)){ search = !search; break; }
                        }
                    }else{
                        this.log('Диапазоны не заданы');
                    }
                }
                if(search){
                    this.setPriceItem(Number(this.selectSku.PRICE.CIRCE[i].PRICE), Number(value));
                    this.setPriceOne(Number(this.selectSku.PRICE.CIRCE[i].PRICE), 'i');
                    this.finalSelectsParams.CIRC = {ID: this.selectSku.PRICE.CIRCE[i].CATALOG_GROUP_ID, QUANTITY: Number(value), NAME: Number(value) + ' шт.'}
                }
                this.log(this.finalSelectsParams);
                this.selectCirc = value + ' шт.'
            }else{
                this.selectCirc = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.circulationList.list).querySelector('.active').innerHTML;
                this.log(this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE]);
            }
        },
        remActiveItemList: function (list) {
            this.log('remActiveItemList');
            //BX.adjust(BX(list).querySelector('.active'), {props:{className:''}});
            BX.toggleClass(BX(list).querySelector('.active'), 'active');
        },
        addSpiner: function (elem) {
            this.log('addSpiner');
            var spinerDOM = BX.create('DIV', {
                props: {
                    className: 'text-center'
                },
                children: [
                    BX.create('DIV', {
                        props: {
                            className: 'spinner-border'
                        },
                    })
                ]
            });
            BX.append(spinerDOM, elem);
        },
        addSpinerBasket: function () {
            this.log('addSpinerBasket');

            var spinerDOM = BX.create('DIV', {
                props: {
                    className: 'spinner-border text-light mt-auto mb-auto'
                },
                children: [
                    BX.create('SPAN', {
                        props: {
                            className: 'sr-only'
                        },
                        text: 'Загрузка...'
                    })
                ]
            });

            BX.cleanNode(BX(this.IDS.rootBlock.rightBlock.basket));
            BX.cleanNode(BX(this.IDS.rootBlock.price.priceFinish));

            BX.append(spinerDOM, BX(this.IDS.rootBlock.rightBlock.basket));
        },
        send: function (data, callback, async = true) {
            BX.ajax({
                url: this.ajaxURL,
                data: data,
                method: 'POST',
                dataType: 'json',
                async: async,
                processData: true,
                scriptsRunFirst: false,
                emulateOnload: false,
                start: true,
                cache: false,
                onsuccess: callback,
                onfailure: function(f){
                    console.log(f);
                }
            });
        },
        setOrder: function (){
            this.log('setOrder');

            var dataForm = $('#'+ this.IDS.rootBlock.rightBlock.form).serializeArray(),
                delivery = $('#'+ this.IDS.rootBlock.rightBlock.delivery + ' .delivery-item.active>img').attr('id'),
                pay = $('#'+ this.IDS.rootBlock.rightBlock.pay + ' .pay-item.active>img').attr('id'),
                fieldKey, domField, error = false, data = {}, result, promice, _this = this;

            for(fieldKey in dataForm){
                domField = $('#'+ this.IDS.rootBlock.rightBlock.form + ' input[name="' + dataForm[fieldKey].name + '"]');

                if(dataForm[fieldKey].value === '') {
                    domField.prev().text('Поле ' + domField.attr('placeholder') + ' обязательно к заполнению!');
                    domField.parent().addClass('valid_err');
                    error = true;
                } else if(!this.validateOrdFields(dataForm[fieldKey].name, dataForm[fieldKey].value)){
                    domField.prev().text('Поле ' + domField.attr('placeholder') + ' неверно заполнено!');
                    domField.parent().addClass('valid_err');
                    error = true;
                } else {
                    if(domField.parent().hasClass('valid_err')) {
                        domField.prev().text('');
                        domField.parent().removeClass('valid_err');
                    }
                }
            }

            if(!error){
                BX.cleanNode(BX(this.IDS.popup.content));

                BX.append(this.getSpinnerPopupOrder(), BX(this.IDS.popup.content));

                this.popupMessage.show();

                dataForm.push({name: 'DELIVERY', value: delivery});
                dataForm.push({name: 'PAY', value: pay});

                data['action'] = 'createOrder';
                data['form'] = dataForm;

                this.send(data, function (data) {
                    result = data;
                    BX.cleanNode(BX(_this.IDS.popup.content));
                    BX.append(_this.getMessagePopupOrder(result), BX(_this.IDS.popup.content));
                    _this.popupMessage.adjustPosition();
                    }, true);
            }

        },
        setImg: function (...params) {
            this.log('setImg');

            switch (params[0]) {
                case 'first':
                    BX.cleanNode(this.IDS.rootBlock.firstStep.prodimg);

                    BX.append(
                        BX.create('IMG', {
                        attrs: {
                            src: params[1]
                        }
                    }), BX(this.IDS.rootBlock.firstStep.prodimg));
                break;
                case 'next':
                    BX.cleanNode(params[2]);

                    BX.append(
                        BX.create('IMG', {
                            attrs: {
                                src: params[1]
                            }
                        }), BX(params[2]));
                break;
                case 'basket':
                    BX.cleanNode(this.IDS.rootBlock.fifthStep.prodimg);

                    BX.append(
                        BX.create('IMG', {
                            attrs: {
                                src: params[1]
                            }
                        }), BX(this.IDS.rootBlock.fifthStep.prodimg));
                break;
            }
        },
        setBasketDOM: function (basket, error = false) {
            this.log('setBasketDOM');

            if(!error){
                var props, dizUpak, urid, blockProps, blockUpakDizain, blockUr;
                BX.cleanNode(BX(this.IDS.rootBlock.rightBlock.basket));
                for(var key in basket.ITEMS){
                    if(
                        this.itemsByDizainRes.hasOwnProperty(basket.ITEMS[key].ID) ||
                        this.itemsByUpakRes.hasOwnProperty(basket.ITEMS[key].ID) ||
                        this.itemsByUrRes.hasOwnProperty(basket.ITEMS[key].ID)
                    ) continue;

                    props = BX.create('DIV', {
                        props: {
                            className: 'd-flex flex-column'
                        },
                        children: [
                            BX.create('DIV', {
                                text: 'Основные параметры',
                                props: {
                                    className: 'basket-param-name'
                                }
                            })
                        ]
                    });
                    dizUpak = BX.create('DIV', {
                        props: {
                            className: 'd-flex flex-column'
                        },
                        children: [
                            BX.create('DIV', {
                                text: 'Дизайн и упаковка',
                                props: {
                                    className: 'basket-param-name'
                                }
                            })
                        ]
                    });
                    urid = BX.create('DIV', {
                        props: {
                            className: 'd-flex flex-column'
                        },
                        children: [
                            BX.create('DIV', {
                                text: 'Юридическая поддержка',
                                props: {
                                    className: 'basket-param-name'
                                }
                            })
                        ]
                    });

                    for(var grPropKey in basket.ITEMS[key].PROPS){
                        switch (grPropKey) {
                            case 'PROPS':
                                blockProps = BX.create('DIV', {
                                    props:{
                                        className: 'row m-0 gy-1 basket-params-list'
                                    }
                                });
                                for(var propKey in basket.ITEMS[key].PROPS[grPropKey]) {
                                    BX.append(BX.create('DIV', {
                                        props:{
                                            className: 'col-6 p-0'
                                        },
                                        html: '<b>' + basket.ITEMS[key].PROPS[grPropKey][propKey].NAME + ':</b> ' + basket.ITEMS[key].PROPS[grPropKey][propKey].VALUE
                                    }), blockProps);
                                }
                                BX.append(blockProps, props);
                            break;
                            case 'SERVICES':
                                blockUpakDizain = BX.create('DIV', {
                                    props:{
                                        className: 'd-flex gap-2 flex-wrap basket-params-list'
                                    }
                                });
                                blockUr = BX.create('DIV', {
                                    props:{
                                        className: 'd-flex gap-2 flex-wrap basket-params-list'
                                    }
                                });
                                for(var propKey in basket.ITEMS[key].PROPS[grPropKey]) {
                                    if(propKey === 'DIZAIN' || propKey === 'UPAKOVKA') {
                                        for(var propDU in basket.ITEMS[key].PROPS[grPropKey][propKey]){
                                            BX.append(BX.create('DIV', {
                                                html: '<b>' + basket.ITEMS[key].PROPS[grPropKey][propKey][propDU].NAME + ':</b> ' + basket.ITEMS[key].PROPS[grPropKey][propKey][propDU].VALUE
                                            }), blockUpakDizain);
                                        }
                                    }else if(propKey === 'URID'){
                                        for(var propUR in basket.ITEMS[key].PROPS[grPropKey][propKey]) {
                                            BX.append(BX.create('DIV', {
                                                html: '<b>' + basket.ITEMS[key].PROPS[grPropKey][propKey][propUR].NAME + ':</b> ' + basket.ITEMS[key].PROPS[grPropKey][propKey][propUR].VALUE
                                            }), blockUr);
                                        }
                                    }
                                }
                                BX.append(blockUpakDizain, dizUpak);
                                BX.append(blockUr, urid);
                            break;
                        }
                    }

                    BX.append(BX.create('DIV', {
                        props: {
                            className: 'b-item d-flex flex-column mb-4'
                        },
                        children: [
                            BX.create('DIV', {
                                text: basket.ITEMS[key].PRODUCT_NAME ? basket.ITEMS[key].PRODUCT_NAME : basket.ITEMS[key].NAME,
                                props: {
                                    className: 'basket-item-name'
                                },
                            }),
                            BX.create('DIV', {
                                props: {
                                    className: 'basket-item-params d-flex gap-3'
                                },
                                children: [
                                    BX.create('DIV', {
                                        text: 'параметры товара',
                                        dataset: {
                                            id: basket.ITEMS[key].ID
                                        },
                                        props: {
                                            className: 'd-flex align-items-center gap-2 basket-params-menu-button'
                                        },
                                        events: {
                                            click: BX.proxy(this.openListParam, this)
                                        }
                                    }),
                                    BX.create('DIV', {
                                        text: 'удалить товар',
                                        props: {
                                            id: basket.ITEMS[key].ID,
                                            className: 'd-flex align-items-center gap-2 basket-del-item'
                                        },
                                        events: {
                                            click: BX.proxy(this.delItemPopup, this)
                                        }
                                    })
                                ]
                            }),
                            BX.create('DIV', {
                                props: {
                                    id: basket.ITEMS[key].ID + '_params',
                                    className: 'd-flex flex-column basket-params-item-block'
                                },
                                children: [
                                    props,
                                    dizUpak,
                                    urid
                                ]
                            })
                        ]
                    }), BX(this.IDS.rootBlock.rightBlock.basket));
                }
                /*BX.adjust(BX(this.IDS.rootBlock.price.priceFinish), {text: this.numberFormat(basket.PRICE_BASKET, 0, ',', ' ') + ' руб.'});*/
            }else{
                BX.cleanNode(BX(this.IDS.rootBlock.rightBlock.basket));
                BX.append(BX.create('DIV', {
                    text: 'Ошибка корзины'
                }), BX(this.IDS.rootBlock.rightBlock.basket));

                this.log(error);
            }
        },
        setPriceLabel: function () {
            this.log('setPriceLabel');

            var domPriceMain = BX(this.IDS.rootBlock.price.main),
                finalPrice = 0, key;

            for(key in this.finalSelectsPrices){
                finalPrice += Number(this.finalSelectsPrices[key]);
            }

            BX.adjust(BX(this.IDS.rootBlock.price.price), {text: this.numberFormat(finalPrice, 0, ',', ' ') + ' руб.'});

            BX.toggleClass(domPriceMain, 'pulse');
            setTimeout(function() {  BX.toggleClass(domPriceMain, 'pulse'); }, 1000);
        },
        setPriceItem: function (price, quant) {
            this.log('setPriceItem');

            Math.round(price);
            this.finalSelectsPrices.FINAL_PRICE_ITEM = price * quant;

            this.setPriceLabel();
        },
        setPriceDizain: function (price, add) {
            this.log('setPriceDizain');

            if(add) { this.finalSelectsPrices.FINAL_PRICE_DIZAIN += Number(price); }
            else { this.finalSelectsPrices.FINAL_PRICE_DIZAIN -= Number(price); }

            BX.adjust(BX(this.IDS.rootBlock.secondStep.servicesPrice).querySelector('span'), {
                text: this.numberFormat((this.finalSelectsPrices.FINAL_PRICE_DIZAIN), 0, ',', ' ') + ' руб.'
            });

            this.setPriceLabel();
        },
        setPriceUpak: function (price, add) {
            this.log('setPriceUpak');

            price = price * this.finalSelectsParams.CIRC.QUANTITY;

            if(add) { this.finalSelectsPrices.FINAL_PRICE_UPAK += Number(price); }
            else { this.finalSelectsPrices.FINAL_PRICE_UPAK -= Number(price); }

            BX.adjust(BX(this.IDS.rootBlock.thirdStep.servicesPrice).querySelector('span'), {
                text: this.numberFormat((this.finalSelectsPrices.FINAL_PRICE_UPAK), 0, ',', ' ') + ' руб.'
            });

            this.setPriceLabel();
        },
        setPriceUr: function (price, add) {
            this.log('setPriceUr');

            if(add) { this.finalSelectsPrices.FINAL_PRICE_UR += Number(price); }
            else { this.finalSelectsPrices.FINAL_PRICE_UR -= Number(price); }

            BX.adjust(BX(this.IDS.rootBlock.fourthStep.servicesPrice).querySelector('span'), {
                text: this.numberFormat((this.finalSelectsPrices.FINAL_PRICE_UR), 0, ',', ' ') + ' руб.'
            });

            this.setPriceLabel();
        },
        setPriceOne: function(price, label){
            this.log('setPriceOne');

            if(label === 'i'){
                BX.adjust(BX('price-one-t'), { text: '' });
                BX.adjust(BX('price-one-i'), { text: this.numberFormat(price, 0, ',', ' ') + ' руб / 1 шт' });
            }else if(label === 't'){
                BX.adjust(BX('price-one-i'), { text: '' });
                BX.adjust(BX('price-one-t'), { text: this.numberFormat(price, 0, ',', ' ') + ' руб / 1 шт' });
            }
        },
        setVolumeList: function () {
            this.log('setVolumeList');

            var labels = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.volumeList.block).querySelectorAll('.active'), i,
            textProp = this.selectItem.SKU_PROPERTY[this.SKU_PROPS['OBYEM_OBSHCHIY']['CODE']][Object.keys(this.selectItem.SKU_PROPERTY[this.SKU_PROPS['OBYEM_OBSHCHIY']['CODE']])[0]].VALUE;

            this.fillingLists('props', 'OBYEM_OBSHCHIY', 'volumeList', 'volume', 'Нет объёма');

            if(labels.length > 0){
                labels.forEach(item => {
                    BX.toggleClass(BX(item), 'active');
                })
            }

            for(i = 0; i < this.volUnits.length; i++){
                if(textProp.indexOf(this.volUnits[i]) > 0){
                    if(this.volUnits[i] === 'мл') BX.toggleClass(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.volumeList.block).querySelector('.volume-ml'), 'active');
                    if(this.volUnits[i] === 'гр') BX.toggleClass(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom.volumeList.block).querySelector('.volume-gr'), 'active');
                    break;
                }
            }
        },
        setFragranceList: function () {
            this.log('setFragrance');

            $("#" + this.IDS.rootBlock.subfirstStep.skuParamsDom.fragranceList.scrollBlock).mCustomScrollbar("destroy");

            this.fillingLists('props', 'AROMAT_OBSHCHIY', 'fragranceList', 'fragrance', 'Нет аромата');

            $("#" + this.IDS.rootBlock.subfirstStep.skuParamsDom.fragranceList.scrollBlock).mCustomScrollbar({ theme: "light-thick", setWidth: '100%' });
        },
        setCirculationList: function () {
            this.log('setCirculationList');
            
            this.setPriceOne(this.selectSku.PRICE.CIRCE[0].PRICE, 't');
            this.fillingLists('circulation', 'CIRC', 'circulationList', 'circulation', 'Нет тиража');
        },
        setColorList: function () {
            this.log('setColorList');

            this.fillingLists('props', 'TSVET', 'colorList', 'color', 'Нет цвета');
        },
        setDiametrList: function () {
            this.log('setDiametrList');

            this.fillingLists('props', 'DIAMETR', 'diametr', 'diametr', 'Нет диаметров');
        },
        setDlinaList: function () {
            this.log('setDlinaList');

            this.fillingLists('props', 'DLINA', 'dlina', 'dlina', 'Нет длин');
        },
        setIzgibList: function () {
            this.log('setIzgibList');

            this.fillingLists('props', 'IZGIB', 'izgib', 'izgib', 'Нет изгиба');
        },
        setSelectItemSku: function (item = false, sku = false) {
            this.log('setSelectItemSku');

            if(item) {this.selectItem = item; }
            if(sku) { this.selectSku = sku; }

            if(!item && !sku){
                var search = false, iterSearch = 0, setPriceParam;

                for (var key in this.selectItem.SKU) {
                    for (var keysearch in this.finalSelectsParams.PROPS) {
                        if(Number(this.selectItem.SKU[key]['PROPERTY_' + this.SKU_PROPS[keysearch]['CODE'] + '_ENUM_ID']) === Number(this.finalSelectsParams.PROPS[keysearch].VAL.ID)){
                            iterSearch++;
                        }
                        if(iterSearch === Object.keys(this.finalSelectsParams.PROPS).length) { search = true; }
                    }
                    if(search) { this.selectSku = this.selectItem.SKU[key]; break;}
                    iterSearch = 0;
                }
                if(search){
                    this.finalSelectsParams.SKU = this.selectSku.ID;
                    setPriceParam = this.getPriceQuantSku();
                    this.setPriceItem(setPriceParam.PRICE, setPriceParam.QUANTITY);
                } else { this.log('!-- Характеристика не найдена --!') }

                //this.log(this.finalSelectsParams);
            }
        },
        setSelectsProps: function (node) {
            this.log('setSelectsProps');

            BX.cleanNode(node);

            BX.append(BX.create('DIV', {
                text: 'тираж ' + (this.finalSelectsParams.CIRC.NAME ? this.finalSelectsParams.CIRC.NAME : 0 + ' шт')
            }), node);

            for(var key in this.finalSelectsParams.PROPS){
                BX.append(BX.create('DIV', {
                    text: this.finalSelectsParams.PROPS[key].VAL.VALUE
                }), node);
            }
        },
        setDeliveri: function(e){
            this.log('setDeliveri');

            if(!BX.hasClass(BX(e.target), 'active')) {
                var activeDelivery = BX(document).querySelector('div.delivery-item.active');
                if (activeDelivery !== undefined) {
                    BX.toggleClass(BX(activeDelivery), "active");
                    BX.toggleClass(BX.findParent(BX(e.target), {"tag": "div"}), "active");
                }
            }
        },
        setPay: function(e){
            this.log('setPay');

            if(!BX.hasClass(BX(e.target), 'active')) {
                var activeDelivery = BX(document).querySelector('div.pay-item.active');
                if (activeDelivery !== undefined) {
                    BX.toggleClass(BX(activeDelivery), "active");
                    BX.toggleClass(BX.findParent(BX(e.target), {"tag": "div"}), "active");
                }
            }
        },
        fillingLists: function (...params) {
            this.log('fillingLists - ' + params[1]);
            var prop, flagProp = false;

            if(params[0] === 'props'){
                flagProp = true;
                prop = this.selectItem.SKU_PROPERTY[this.SKU_PROPS[params[1]]['CODE']];
            }else if(params[0] === 'circulation'){
                prop = this.CIRC[this.selectItem.PROPERTY_TIP_TIRAZHA_VALUE];
                this.selectCirc = prop[0].NAME;
            }

            if(!!prop){
                var selectProp = BX.create('UL', {
                    props: {
                        id: this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].list
                    },
                    dataset: {
                        prop: params[1]
                    }
                });

                if(params[1] === 'AROMAT_OBSHCHIY'){

                    BX.cleanNode(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].scrollBlock), true);

                    var scrollContainer = BX.create('DIV', {
                        props: {
                            id: this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].scrollBlock
                        }
                    });
                }else{
                    BX.cleanNode(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].list), true);
                }

                if(Object.keys(prop).length > 1 && params[0] != 'circulation') { prop = this.getSortArrayProps(prop); }

                for (var key in prop) {
                    if(params[1] === 'AROMAT_OBSHCHIY' || params[1] === 'TSVET'){
                        BX.append(
                            BX.create('LI', {
                                props: {
                                    id: prop[key].ID,
                                    className: key === Object.keys(prop)[0] ? 'active' : ''
                                },
                                dataset: {
                                    id: !flagProp ? prop[key].ID : ''
                                },
                                events: {
                                    click: BX.proxy(this.selectListProps, this)
                                },
                                children: [
                                    BX.create('IMG', {
                                        attrs: {
                                            width: '40px',
                                            src: prop[key].IMAGE
                                        }
                                    }),
                                    BX.create('SPAN', {
                                        props: {
                                            className: 'name-' + params[3]
                                        },
                                        text: this.textReduction(prop[key].VALUE)
                                    }),
                                ]
                            }), selectProp);

                    }else{
                        BX.append(
                            BX.create('LI', {
                                text: flagProp ? this.textReduction(prop[key].VALUE) : this.textReduction(prop[key].NAME),
                                props: {
                                    id: flagProp ? prop[key].ID : key,
                                    className: key === Object.keys(prop)[0] ? 'active' : ''
                                },
                                dataset: {
                                    id: !flagProp ? prop[key].ID : ''
                                },
                                events: {
                                    click: BX.proxy(this.selectListProps, this)
                                }
                            }), selectProp);
                    }
                }

                if(BX.isNodeHidden(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].block))) { BX.show(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].block)); }

                if(params[1] === 'AROMAT_OBSHCHIY'){

                    var domLabel = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].params).querySelector('.label-' + params[3]);

                    BX.cleanNode(domLabel);
                    BX.append(BX.create('IMG', {
                        attrs: {
                            width: '40px',
                            src: prop[Object.keys(prop)[0]].IMAGE
                        }
                    }), domLabel);

                    BX.append(BX.create('SPAN', {
                        props: {
                            className: 'name-' + params[3]
                        },
                        text: this.textReduction(prop[Object.keys(prop)[0]].VALUE)
                    }), domLabel);

                    BX.append(selectProp, scrollContainer);
                    selectProp = scrollContainer;
                } else if(params[1] === 'TSVET'){
                    var domLabel = BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].params).querySelector('.label-' + params[3]);

                    BX.cleanNode(domLabel);
                    BX.append(BX.create('IMG', {
                        attrs: {
                            width: '40px',
                            src: prop[Object.keys(prop)[0]].IMAGE
                        }
                    }), domLabel);

                    BX.append(BX.create('SPAN', {
                        props: {
                            className: 'name-' + params[3]
                        },
                        text: this.textReduction(prop[Object.keys(prop)[0]].VALUE)
                    }), domLabel);

                    //selectProp = domLabel;

                }else {
                    BX.adjust(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].params).querySelector('.label-' + params[3]), {text: flagProp ? this.textReduction(prop[Object.keys(prop)[0]].VALUE) : this.textReduction(prop[Object.keys(prop)[0]].NAME)});
                }

                BX.append(selectProp, BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].params));

                if(flagProp) {
                    this.finalSelectsParams.PROPS[params[1]] = {ID: key, VAL: prop[Object.keys(prop)[0]]};
                    this.log(this.finalSelectsParams.PROPS);
                }else{
                    this.finalSelectsParams[params[1]] = {ID: prop[Object.keys(prop)[0]].ID, QUANTITY: prop[Object.keys(prop)[0]].QUANTITY, NAME: prop[Object.keys(prop)[0]].NAME};
                    this.log(this.finalSelectsParams);
                }
            }else{
                this.log('fillingLists: NO PROP - ' + params[1]);
                BX.cleanNode(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].list), true);
                BX.adjust(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].params).querySelector('.label-'+params[3]), {text: params[4]});
                BX.hide(BX(this.IDS.rootBlock.subfirstStep.skuParamsDom[params[2]].block));
            }

        },
        searchPropItem: function (propName, objectProps) {
            this.log('searchPropItem');

            if(!!propName && !!objectProps)
                return (propName in objectProps);
            else return false;
        },
        textReduction: function (text) {
            this.log('textReduction');

            var sliced = text.slice(0, this.reduction);
            if (sliced.length < text.length)
                return sliced += '...';
            else
                return text;
        },
        numberFormat: function(number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        clickSwitchDizain: function (e) {
           this.log('clickSwitch');

            if(!BX.hasClass(BX(e.target), 'switch-on')){
                this.setPriceDizain(this.itemsByDizainRes[BX(e.target).id].PRICE[0].PRICE, true);
                this.finalSelectsParams.DIZAIN[BX(e.target).id] = this.itemsByDizainRes[BX(e.target).id];
            }else{
                this.setPriceDizain(this.itemsByDizainRes[BX(e.target).id].PRICE[0].PRICE);
                delete this.finalSelectsParams.DIZAIN[BX(e.target).id]
            }

            BX.toggleClass(BX(e.target), 'switch-on');
        },
        clickSwitchUpak: function (e) {
            this.log('clickSwitchUpak');

            if(!BX.hasClass(BX(e.target), 'switch-on')){
                this.setPriceUpak(this.itemsByUpakRes[BX(e.target).id].PRICE[0].PRICE, true);
                this.finalSelectsParams.UPAKOVKA[BX(e.target).id] = this.itemsByUpakRes[BX(e.target).id];
            }else{
                this.setPriceUpak(this.itemsByUpakRes[BX(e.target).id].PRICE[0].PRICE);
                delete this.finalSelectsParams.UPAKOVKA[BX(e.target).id]
            }

            BX.toggleClass(BX(e.target), 'switch-on');
        },
        clickSwitchUr: function (e){
            this.log('clickSwitchUr');

            if(!BX.hasClass(BX(e.target), 'switch-on')){
                this.setPriceUr(this.itemsByUrRes[BX(e.target).id].PRICE[0].PRICE, true);
                this.finalSelectsParams.URID[BX(e.target).id] = this.itemsByUrRes[BX(e.target).id];
            }else{
                this.setPriceUr(this.itemsByUrRes[BX(e.target).id].PRICE[0].PRICE);
                delete this.finalSelectsParams.URID[BX(e.target).id]
            }

            BX.toggleClass(BX(e.target), 'switch-on');
        },
        getDomDizain: function (items, callback) {
            this.log('getDomDizain');

            var servDomBlock = BX.create('DIV', {
                props:{
                    className: 'services-list-block d-flex gap-3 flex-column justify-content-evenly'
                }
            }), splitName, price;

            items = this.getSortArrayItems(items);

            for(var i in items){
                splitName = items[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE.split(' ');
                price = items[i].PRICE[0].PRICE;

                if(splitName.length > 2){
                    var temp = [];
                    for(var j = 0; j < splitName.length; j++){
                        if(j == 0) { temp[0] = splitName[j]; }
                        else {
                            if(j == 1)
                                temp[1] = splitName[j] + ' ';
                            else
                                temp[1] += splitName[j] + ' ';
                        }
                    }
                    temp[1] = temp[1].trim();
                    splitName = temp;
                }

                BX.append(BX.create('DIV', {
                    props:{
                        className: 'services-item d-flex'
                    },
                    children: [
                        BX.create('DIV', {
                            props:{
                                className: 'services-name d-flex flex-column align-self-center'
                            },
                            children: [
                                BX.create('DIV', {
                                    text: splitName[0]
                                }),
                                BX.create('DIV', {
                                    props:{
                                        className: 'services-name-big'
                                    },
                                    text: splitName[1]
                                }),
                                BX.create('DIV', {
                                    props:{
                                        className: 'services-price d-flex flex-column align-self-center flex-fill'
                                    },
                                    children: [
                                        BX.create('DIV', {
                                            text: 'Стоимость услуги'
                                        }),
                                        BX.create('DIV', {
                                            text: this.numberFormat(price, 0, ',', ' ') + ' руб.'
                                        })
                                    ]
                                })
                            ]
                        }),

                        BX.create('DIV', {
                            props:{
                                className: 'services-check flex-fill d-flex align-self-center justify-content-end'
                            },
                            children: [
                                BX.create('DIV', {
                                    props:{
                                        id: items[i].ID,
                                        className: 'switch-btn'
                                    },
                                    events: {
                                        click: BX.proxy(callback, this)
                                    }
                                })
                            ]
                        })
                    ]

                }), servDomBlock);
            }
            return servDomBlock;
        },
        getDomUpakUr: function (items, callback) {
            this.log('getDomUpakUr');

            var servDomBlock = BX.create('DIV', {
                props:{
                    className: 'services-list-block d-flex gap-3 flex-column justify-content-evenly'
                }
            }), price, i;

            items = this.getSortArrayItems(items);

            for(i in items){
                price = items[i].PRICE[0].PRICE;

                BX.append(BX.create('DIV', {
                    props:{
                        className: 'services-item d-flex'
                    },
                    children: [
                        BX.create('DIV', {
                            props: {
                                className: 'd-flex flex-column align-self-center flex-fill'
                            },
                            children: [
                                BX.create('DIV', {
                                    props:{
                                        className: 'services-name'
                                    },
                                    children: [
                                        BX.create('DIV', {
                                            text: items[i].PROPERTY_NAZVANIE_DLYA_KONSTRUKTORA_VALUE
                                        })
                                    ]
                                }),
                                BX.create('DIV', {
                                    props:{
                                        className: 'services-price'
                                    },
                                    children: [
                                        BX.create('DIV', {
                                            html: (this.MESS[items[i].ID] != undefined ? this.MESS[items[i].ID] : 'Стоимость услуги') + '<br />' + this.numberFormat(price, 0, ',', ' ') + 'р/шт'
                                        })
                                    ]
                                }),
                            ]
                        }),
                        BX.create('DIV', {
                            props:{
                                className: 'services-check d-flex align-self-center justify-content-end'
                            },
                            children: [
                                BX.create('DIV', {
                                    props:{
                                        id: items[i].ID,
                                        className: 'switch-btn'
                                    },
                                    events: {
                                        click: BX.proxy(callback, this)
                                    }
                                })
                            ]
                        })
                    ]

                }), servDomBlock);
            }
            return servDomBlock;
        },
        getPriceQuantSku: function () {
            this.log('getPriceQuantSku');

            var circId = this.finalSelectsParams.CIRC.ID,
                circQu = this.finalSelectsParams.CIRC.QUANTITY,
                selSkuCirc = this.selectSku.PRICE.CIRCE, key;

            for(key in selSkuCirc){
                if(selSkuCirc[key].CATALOG_GROUP_ID === circId){
                    return {PRICE: selSkuCirc[key].PRICE, QUANTITY: circQu};
                }
            }
        },
        getSortArrayItems: function (obj) {
            this.log('getSortArrayItems');

            if(obj instanceof Object && 'SORT' in obj[Object.keys(obj)[0]]){
                var temp = [], i;
                for(i in obj){
                    temp.push(obj[i]);
                }
                temp.sort(function(a, b) {
                    return a.SORT - b.SORT;
                });

                return temp;
            }else{
                this.log('Либо это не объект либо в объекте нет ключа сотрировки SORT');
                return obj;
            }
        },
        getSortArrayProps: function (obj) {
            this.log('getSortArrayProps');

            if(obj instanceof Object && 'SORT' in obj[Object.keys(obj)[0]]){
                var temp = [], i;
                for(i in obj){
                    temp.push(obj[i]);
                }
                temp.sort(function(a, b) {
                    return a.SORT - b.SORT;
                });

                return temp;
            }else{
                this.log('Либо это не объект либо в объекте нет ключа сотрировки SORT');
                return obj;
            }
        },
        getMessagePopupOrder: function (result) {
            this.log('getMessagePopupOrder');

            if(!result.error){
                return BX.create('DIV', {
                    children: [
                        BX.create('DIV', {
                            html: result.result
                        }),
                        BX.create('DIV', {
                            text: 'OK',
                            props: {
                                className: 'button-no mt-5 ms-auto me-auto d-flex justify-content-center align-items-center'
                            },
                            events: {
                                click: BX.proxy(function(){
                                    $('#ui-id-1').click();
                                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-1');
                                    this.reinit();
                                    this.popupMessage.close();
                                }, this)
                            }
                        }),
                        BX.create('HR', {
                            props: {
                                className: 'mt-5'
                            }
                        }),
                        BX.create('DIV', {
                            props: {
                                className: 'button-block d-flex flex-column gap-3 justify-content-between'
                            },
                            children: [
                                BX.create('DIV', {
                                    text: 'Создать ещё заказ',
                                    props: {
                                        id: 'button_7_reopen',
                                        className: 'popup-button-re d-flex align-items-center'
                                    },
                                    dataset: {
                                        step: 5
                                    },
                                    events: {
                                        click: BX.proxy(function(){
                                                    $('#ui-id-1').click();
                                                    setTimeout(this.scrollTo, this.timeScroll, 'ui-id-1');
                                                    this.reinit();
                                                    this.popupMessage.close();
                                                }, this)
                                    }
                                }),
                                BX.create('DIV', {
                                    text: 'Перейти на сайт MIXON',
                                    props: {
                                        className: 'popup-button-mixon d-flex align-items-center'
                                    },
                                    events: {
                                        click: BX.proxy(function(){
                                            window.location.href = "/";
                                        })
                                    }
                                })
                            ]
                        })
                    ]
                });
            } else {
                return BX.create('DIV', {
                    children: [
                        BX.create('DIV', {
                            html: result.errorMessage
                        })
                    ]
                });
            }
        },
        getSpinnerPopupOrder: function () {
            this.log('getSpinnerPopupOrder');

            return BX.create('DIV', {
                children: [
                    BX.create('DIV', {
                        html: '<div class="tittle-answer">Идёт создание<br />Вашего заказа</div><div class="subtittle-answer">Это может занять какое-то время.<br />Спасибо за ожидание.<br />Совсем скоро все будет готово.</div>',
                        props: {
                            className: 'text-center'
                        }
                    }),
                    BX.create('DIV', {
                        props: {
                            className: 'text-center'
                        },
                        children: [
                            BX.create('DIV', {
                                style: {
                                    width: '5rem',
                                    height: '5rem'
                                },
                                props: {
                                    className: 'spinner-border'
                                }
                            })
                        ]
                    })
                ]
            });
        },
        validateOrdFields: function (field, val) {
            this.log('validateOrdFields');

            var regex;

            switch (field) {
                case 'TEL': regex = new RegExp("^(\\+?(\\d{1,3})?[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$"); break;
                case 'MAIL': regex = new RegExp("^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$"); break;
                case 'FIO': regex = new RegExp("^[a-zA-Zа-яА-Я. ]{1,50}$"); break;
                case 'ADRESS': regex = new RegExp("^[a-zA-Zа-яА-Я0-9. ]{3,100}$"); break;
                case 'REGION': regex = new RegExp("^[a-zA-Zа-яА-Я0-9. ]{3,100}$"); break;
            }
            return regex.test(val.trim());
        },
        popupWindow: function () {
            this.log('popupWindow');

            this.popupMessage = BX.PopupWindowManager.create(this.IDS.popup.main, null, {
                content: BX.create('DIV', {
                    props: {
                        className: 'd-flex flex-column gap-5'
                    },
                    children: [
                        BX.create('DIV', {
                            props: {
                                id: this.IDS.popup.content
                            },
                        }),
                    ]
                }),
                width: 'auto', // ширина окна
                zIndex: 100, // z-index
                closeIcon: {
                    // объект со стилями для иконки закрытия, при null - иконки не будет
                    opacity: 1
                },
                closeByEsc: false, // закрытие окна по esc
                darkMode: false, // окно будет светлым или темным
                autoHide: false, // закрытие при клике вне окна
                draggable: false, // можно двигать или нет
                resizable: false, // можно ресайзить
                min_height: 100, // минимальная высота окна
                min_width: 100, // минимальная ширина окна
                lightShadow: false, // использовать светлую тень у окна
                angle: false, // появится уголок
                overlay: {
                    // объект со стилями фона
                    backgroundColor: 'black',
                    opacity: 700
                },
                events: {
                    onPopupShow: function() {
                        // Событие при показе окна
                    },
                    onPopupClose: function() {
                        // Событие при закрытии окна
                    }
                }
            });
        }
    }
})(window);