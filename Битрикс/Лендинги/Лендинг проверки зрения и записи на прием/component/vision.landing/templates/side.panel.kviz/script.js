(function() {
    'use strict';

    if(!!window.KvizHandler)
        return;

    window.KvizHandler = function(params) {
        this.blocks = params.blocks;
        this.dates = params.dates;
        this.times = params.times;
        this.type = params.type;

        this.mainBlock = BX(this.blocks.MAIN_BLOCK);
        this.questionBlock = BX(this.blocks.QUESTION_BLOCK);
        this.questionContentBlock = BX(this.blocks.QUESTION_CONTENT);
        this.questions = Array.from(this.mainBlock.querySelectorAll('div.'+this.blocks.QUESTIONS));
        this.results = Array.from(this.mainBlock.querySelectorAll('div.'+this.blocks.RESULTS));
        this.linkTelegram = Array.from(this.mainBlock.querySelectorAll('div.link_telegram'));
        this.addCalendar = this.mainBlock.querySelector('div.add_calendar');
        this.btnRecording = Array.from(this.mainBlock.querySelectorAll('div.btn_recording'));
        this.blockRecording = BX(this.blocks.BLOCK_RECORDING);
        this.blockDataUser = BX(this.blocks.BLOCK_DATA_USER);
        this.blockResult = BX(this.blocks.BLOCK_RESULT);
        this.blockError = BX(this.blocks.BLOCK_ERROR);
        //this.fieldsDataUser = Array.from(this.blockDataUser.querySelectorAll('[data-name="DATA_USER"]'));
        this.offices = Array.from(this.blockRecording.querySelectorAll('input[type="radio"][name="OFFICE"]'));
        this.closeBtn = BX(this.blocks.CLOSE_SIDER_BTN);
        this.nextBtn = BX(this.blocks.NEXT_BTN);
        this.nextBtnCalc = BX(this.blocks.NEXT_BTN_CALC);
        this.nextBtnData = BX(this.blocks.NEXT_BTN_DATA);
        this.blockTittle = BX(this.blocks.BLOCK_TOP_TITTLE);
        this.blockBottom = BX(this.blocks.BLOCK_BOTTOM);
        this.backBtn = BX(this.blocks.BACK_BTN);
        this.goSiteBtn = BX(this.blocks.GO_SITE_BTN);
        this.reloadSiteBtn = BX(this.blocks.RELOAD_SITE_BTN);
        this.precentBlock = BX(this.blocks.BLOCK_PRECENT).querySelector('span');
        this.onePrecent = (100 / this.questions.length);
        this.allPrecent = 0;
        this.progressBlock = BX(this.blocks.BLOCK_PROGRESS);
        this.qsObj = []; //Объект с вопросами
        this.resObj = []; //Объект с результатами вопросов

        //Результирующий объект
        this.resultObj = {
            ANSWERS: {},
            CALENDAR: {
                DATE: {},
                TIME: {},
                OFFICE: {
                    ADDRESS: '',
                    VALUE: '',
                    METRO: {}
                }
            },
            DATA_USER: {}
        };

        this.activeQ = 1;
        this.init();
    };

    window.KvizHandler.prototype = {
        init: function() {
            if(!!this.questionContentBlock){
                BX.bind(this.questionContentBlock, 'change', BX.proxy(this.changeAnswer, this));
            }
            //Scrollbar.init(this.questionContentBlock, {damping: 0.08});

            if(!!this.type && this.type !== 'undefined'){
                if(this.type === 'kviz'){
                    BX.addClass(this.backBtn, 'dis');
                    if(this.questions.length > 0){
                        let keyQ;
                        for(let keyQ in this.questions){
                            this.qsObj.push({
                                DOM: this.questions[keyQ],
                                NUM: Number(this.questions[keyQ].dataset.qu)
                            });
                            this.resultObj.ANSWERS['q_'+this.questions[keyQ].dataset.qu] = {
                                ANSWER: false
                            };
                            BX.remove(this.questions[keyQ]);
                        }

                        BX.append(this.qsObj.find(q => q.NUM === this.activeQ).DOM, this.questionContentBlock);
                    }
                } else if(this.type === 'recording'){
                    this.goRecording();
                } else if(this.type === 'develop'){
                    console.log('dev');
                }
            }

            if(this.results.length > 0){
                let keyR;

                for(let keyR in this.results){
                    this.resObj.push({
                        DOM: this.results[keyR],
                        RES: Number(this.results[keyR].dataset.res)
                    });
                    BX.remove(this.results[keyR]);
                }
            }

            if(this.linkTelegram.length > 0){
                let keyTel;

                for(let keyTel in this.linkTelegram){
                    BX.bind(this.linkTelegram[keyTel], 'click', BX.proxy(this.goTelegram, this));
                }
            }

            if(!!this.addCalendar){
                BX.bind(this.addCalendar, 'click', BX.proxy(this.openGoogleCalendar, this));
            }

            if(this.btnRecording.length > 0){
                let keyRec;

                for(let keyRec in this.btnRecording){
                    BX.bind(this.btnRecording[keyRec], 'click', BX.proxy(this.goRecording, this));
                }
            }

            if(!!this.closeBtn) {
                BX.bind(this.closeBtn, 'click', BX.proxy(this.close, this));
            }

            if(!!this.nextBtn) {
                BX.bind(this.nextBtn, 'click', BX.proxy(this.next, this));
            }

            if(!!this.nextBtnData){
                BX.bind(this.nextBtnData, 'click', BX.proxy(this.nextData, this));
            }

            if(!!this.blockRecording && !!this.nextBtnCalc) {
                let domDates = Array.from(this.blockRecording.querySelectorAll('div.recording-date[data-ev="date"]')),
                    domTimes = Array.from(this.blockRecording.querySelectorAll('div.recording-time[data-ev="time"]')),
                    kd, kt;

                if(domDates.length > 0){
                    for(kd in domDates){
                        BX.bind(domDates[kd], 'click', BX.proxy(this.changeDate, this));
                    }
                }

                if(domTimes.length > 0){
                    for(kt in domTimes){
                        BX.bind(domTimes[kt], 'click', BX.proxy(this.changeTime, this));
                    }
                }

                BX.bind(this.blockRecording.querySelector('div.recording-date[data-ev="more-date"]'), 'click', BX.proxy(this.loadMoreDate, this));
                BX.bind(this.blockRecording.querySelector('div.recording-time[data-ev="more-time"]'), 'click', BX.proxy(this.loadMoreTime, this));

                BX.bind(this.nextBtnCalc, 'click', BX.proxy(this.nextCalc, this));

            }

            if(!!this.backBtn) {
                BX.bind(this.backBtn, 'click', BX.proxy(this.back, this));
            }

            BX.style(this.progressBlock, 'width', '0');

            if(!!this.precentBlock){
                BX.adjust(this.precentBlock, { text: this.allPrecent+'%' } )
            }

            if(this.offices.length > 0){
                let valOff = this.blockRecording.querySelectorAll('input[type="radio"][name="OFFICE"]').value;

                if(!!valOff){
                    this.resultObj.CALENDAR.OFFICE = valOff;
                }
            }

            /*$(this.blockDataUser.querySelector('input[name="KVIZ_TEL"]')).mask( '9 (999) 999-9999', { completed: BX.proxy(this.checkFormDataUser, this) }).on("focus", function() {
                console.log(this);
                this.setSelectionRange(0, 0);
            });*/

            const mask = IMask(
                $(this.blockDataUser.querySelector('input[name="KVIZ_TEL"]')).get(0),
                {
                    mask: '+{7} (000) 000-0000',
                    lazy: false
                }
            )

            mask.on('click', function(e) {
                if (this.value === '') {
                    this.value = '+7 ';
                    this.setSelectionRange(3, 3);
                }
            });

            mask.on('complete', BX.proxy(this.checkFormDataUser, this));

            /*if(!!this.goSiteBtn){
                BX.bind(this.goSiteBtn, 'click', BX.proxy(this.closeAndRemove, this));
            }*/

            if(!!this.reloadSiteBtn){
                BX.bind(this.reloadSiteBtn, 'click', BX.proxy(this.reloadSite, this));
            }

            $.fn.serialize = function (options) {
                return $.param(this.serializeArray(options));
            };
            $.fn.serializeArray = function (options) {
                var o = $.extend({
                    checkboxesAsBools: false
                }, options || {});

                var rselectTextarea = /select|textarea/i;
                var rinput = /text|hidden|password|search|number/i;

                return this.map(function () {
                    return this.elements ? $.makeArray(this.elements) : this;
                })
                    .filter(function () {
                        return this.name && !this.disabled &&
                            (this.checked
                                || (o.checkboxesAsBools && this.type === 'checkbox')
                                || rselectTextarea.test(this.nodeName)
                                || rinput.test(this.type));
                    })
                    .map(function (i, elem) {
                        var val = $(this).val();
                        return val == null ?
                            null :
                            $.isArray(val) ?
                                $.map(val, function (val, i) {
                                    return { name: elem.name, value: val };
                                }) :
                                {
                                    name: elem.name,
                                    value: (o.checkboxesAsBools && this.type === 'checkbox') ?
                                        (this.checked ? 'Y' : 'N') :
                                        val
                                };
                    }).get();
            };

        },

        toMoscowTime: function (date) {
            const localOffset = date.getTimezoneOffset();
            const moscowOffset = -180;
            const diff = localOffset - moscowOffset;

            const moscowTime = new Date(date.getTime() + diff * 60 * 1000);
            return moscowTime;
        },

        openGoogleCalendar: function(e) {
            if('TIMESTAMP' in this.resultObj.CALENDAR.TIME && 'TIMESTAMP' in this.resultObj.CALENDAR.DATE){
               
                let startDate = new Date(this.resultObj.CALENDAR.DATE.TIMESTAMP * 1000).toISOString().split('T')[0],
                    config = {
                        name: "Запись на проверку зрения",
                        startDate: startDate,
                        startTime: this.resultObj.CALENDAR.TIME.TIME_FORMAT,
                        endTime: this.resultObj.CALENDAR.TIME.TIME_END_FORMAT,
                        options: ['Apple','Google','Outlook.com','Microsoft365','iCal','MicrosoftTeams','Yahoo'],
                        timeZone: "Europe/Moscow",
                        location: this.resultObj.CALENDAR.OFFICE.ADDRESS,
                        customLabels: {
                            "close":"Закрыть",
                            "apple":"Apple календарь",
                            "google":"Google календарь",
                            "ical":"iCal файл"
                        }
                    };

                atcb_action(config, this.addCalendar);

                /*var datetime = this.combineDateAndTime(
                    (this.resultObj.CALENDAR.DATE.TIMESTAMP * 1000),
                    (this.resultObj.CALENDAR.TIME.TIMESTAMP * 1000)
                );

                const start = new Date(this.toMoscowTime(datetime));
                const end = new Date(start.getTime() + 30 * 60 * 1000);
                const startStr = start.toISOString().replace(/-|:|\.\d\d\d/g, '');
                const endStr = end.toISOString().replace(/-|:|\.\d\d\d/g, '');
                const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Запись+на+проверку+зрения&dates=${startStr}/${endStr}&details=Вы+записаны+на+приём`;
                window.open(url, '_blank');*/
            }
        },

        combineDateAndTime: function(timestampDate, timestampTime) {
            const date = new Date(timestampDate);
            const time = new Date(timestampTime);

            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                time.getHours(),
                time.getMinutes(),
                time.getSeconds(),
                time.getMilliseconds()
            );
        },

        goRecording: function () {
            if(this.type === 'recording'){
                BX.addClass(this.backBtn, 'dis');
            }
            BX.cleanNode(this.questionContentBlock);
            if(!BX.isNodeHidden(this.blockBottom)){
                BX.hide(this.blockBottom);
            }
            BX.append(this.blockRecording, this.questionContentBlock);
            BX.adjust(this.blockTittle, { text: 'Запись на приём' } );
            BX.addClass(this.mainBlock, 'h-auto');
            this.backBtn.dataset.back = 'result';
        },

        goTelegram: function () {
            ym(102969881,'reachGoal','soc-lend');
            window.open('https://t.me/refacedspb', '_blank');
        },

        goSite: function () {
            window.open('https://refaced.ru', '_self');
        },

        reloadSite: function () {
            location.reload();
        },

        changeAnswer: function (e) {
            if(e.target.name === 'OFFICE'){
                this.resultObj.CALENDAR.OFFICE = e.target.value;
            } else if(e.target.dataset.name === 'DATA_USER'){
                this.checkFormDataUser();
            } else {
                let resObjKeyQ = Object.keys(this.resultObj.ANSWERS).find(k => k === 'q_'+this.activeQ);

                if(BX.hasClass(this.nextBtn, 'disabled')){
                    BX.removeClass(this.nextBtn, 'disabled');
                }

                if(!!this.precentBlock && !this.resultObj.ANSWERS[resObjKeyQ].ANSWER){
                    this.allPrecent = this.allPrecent + this.onePrecent;
                    BX.adjust(this.precentBlock, { text: this.allPrecent + '%' } )
                    BX.style(this.progressBlock, 'width', this.allPrecent + '%');
                }

                this.resultObj.ANSWERS[resObjKeyQ].ANSWER = e.target.value;
                this.resultObj.ANSWERS[resObjKeyQ].ANSWER_text = $(e.target).next().text();
                this.resultObj.ANSWERS[resObjKeyQ].QUESTION_text = $(`div.kviz_question[data-qu="${this.activeQ}"] div.qu_text`).text();
            }
        },

        changeDate: function (e) {
            e.preventDefault();

            if('DATE_FORMAT' in this.resultObj.CALENDAR.DATE){
                BX.removeClass(this.blockRecording.querySelector('div.recording-date[data-stamp="'+this.resultObj.CALENDAR.DATE.TIMESTAMP+'"]'), 'active');
            }

            this.resultObj.CALENDAR.DATE = {
                TIMESTAMP: e.currentTarget.dataset.stamp,
                DATE_FORMAT: this.dates.find(d => d.TIMESTAMP === e.currentTarget.dataset.stamp).DATE_FORMAT,
                DATE_FORMAT_NO_WEEK: this.dates.find(d => d.TIMESTAMP === e.currentTarget.dataset.stamp).DATE_FORMAT_NO_WEEK
            };

            if('TIME_FORMAT' in this.resultObj.CALENDAR.TIME){
                BX.removeClass(this.blockRecording.querySelector('div.recording-time[data-stamp="'+this.resultObj.CALENDAR.TIME.TIMESTAMP+'"]'), 'active');
            }
            this.resultObj.CALENDAR.TIME = {};

            BX.addClass(e.currentTarget, 'active');

            if(e.currentTarget.dataset.today === 'Y'){
                $('.kviz_recording-times > .recording-time[data-back="Y"]').hide();
            } else {
                $('.kviz_recording-times > .recording-time[data-back="Y"]').show();
            }

            this.checkResultCalendar();
        },

        loadMoreDate: function (e){
            e.preventDefault();
            let keyMD, count = 0;

            for(keyMD in this.dates){
                if(count === 7) break;
                if(this.dates[keyMD].ADDED === 'N'){
                    this.dates[keyMD].ADDED = 'Y';

                    BX.insertBefore(BX.create('DIV', {
                        attrs: {
                            className: 'recording-date'
                        },
                        dataset: {
                            ev: 'date',
                            stamp: this.dates[keyMD].TIMESTAMP,
                            today: this.dates[keyMD].TODAY
                        },
                        events: {
                            click: BX.proxy(this.changeDate, this)
                        },
                        children: [
                            BX.create('SPAN', {
                                text: this.dates[keyMD].DATE_FORMAT
                            })
                        ]
                    }), this.blockRecording.querySelector('div.recording-date[data-ev="more-date"]'));
                    count++;
                }

                if(keyMD == (this.dates.length - 1)){
                    BX.remove(this.blockRecording.querySelector('div.recording-date[data-ev="more-date"]'));
                }
            }
        },

        changeTime: function (e) {
            e.preventDefault();

            if('TIME_FORMAT' in this.resultObj.CALENDAR.TIME){
                BX.removeClass(this.blockRecording.querySelector('div.recording-time[data-stamp="'+this.resultObj.CALENDAR.TIME.TIMESTAMP+'"]'), 'active');
            }

            this.resultObj.CALENDAR.TIME = {
                TIMESTAMP: e.currentTarget.dataset.stamp,
                TIME_FORMAT: this.times.find(d => d.TIMESTAMP === e.currentTarget.dataset.stamp).TIME_FORMAT,
                TIME_END_FORMAT: this.times.find(d => d.TIMESTAMP === e.currentTarget.dataset.stamp).TIME_END_FORMAT,
            };

            BX.addClass(e.currentTarget, 'active');

            this.checkResultCalendar();
        },

        loadMoreTime: function (e){
            e.preventDefault();
            let keyMT, count = 0;
            for(keyMT in this.times){
                if(count === 7) break;
                if(this.times[keyMT].ADDED === 'N'){
                    this.times[keyMT].ADDED = 'Y';

                    BX.insertBefore(BX.create('DIV', {
                        attrs: {
                            className: 'recording-time'
                        },
                        dataset: {
                            ev: 'time',
                            stamp: this.times[keyMT].TIMESTAMP,
                            back: this.times[keyMT].BACK
                        },
                        events: {
                            click: BX.proxy(this.changeTime, this)
                        },
                        children: [
                            BX.create('SPAN', {
                                text: this.times[keyMT].TIME_FORMAT
                            })
                        ]
                    }), this.blockRecording.querySelector('div.recording-time[data-ev="more-time"]'));
                    count++;
                }

                if(keyMT == (this.times.length - 1)){
                    BX.remove(this.blockRecording.querySelector('div.recording-time[data-ev="more-time"]'));
                }
            }
        },

        checkResultCalendar: function () {
            let nextBtnCalcSpan = this.nextBtnCalc.querySelector('span.date_tittle'),
                nextBtnDataSpan = this.nextBtnData.querySelector('span.date_tittle');

            if('DATE_FORMAT_NO_WEEK'in this.resultObj.CALENDAR.DATE && 'TIME_FORMAT' in this.resultObj.CALENDAR.TIME){
                if(BX.hasClass(this.nextBtnCalc, 'disabled')){
                    BX.removeClass(this.nextBtnCalc, 'disabled');
                }

                if(!nextBtnCalcSpan){
                    let calcSpan = BX.create('SPAN', {
                        attrs: {
                            className: 'date_tittle'
                        },
                        text: this.resultObj.CALENDAR.DATE.DATE_FORMAT_NO_WEEK + ' в ' +  this.resultObj.CALENDAR.TIME.TIME_FORMAT
                    });
                    BX.append(calcSpan, this.nextBtnCalc.querySelector('div.ld-button-lable-block'))
                } else {
                    BX.adjust(this.nextBtnCalc.querySelector('span.date_tittle'), { text: this.resultObj.CALENDAR.DATE.DATE_FORMAT_NO_WEEK + ' в ' +  this.resultObj.CALENDAR.TIME.TIME_FORMAT } );
                }

                if(!nextBtnDataSpan){
                    let dataSpan = BX.create('SPAN', {
                        attrs: {
                            className: 'date_tittle'
                        },
                        text: this.resultObj.CALENDAR.DATE.DATE_FORMAT_NO_WEEK + ' в ' +  this.resultObj.CALENDAR.TIME.TIME_FORMAT
                    });
                    BX.append(dataSpan, this.nextBtnData.querySelector('div.ld-button-lable-block'))
                } else {
                    BX.adjust(this.nextBtnData.querySelector('span.date_tittle'), { text: this.resultObj.CALENDAR.DATE.DATE_FORMAT_NO_WEEK + ' в ' +  this.resultObj.CALENDAR.TIME.TIME_FORMAT } );
                }
            } else {
                if(!BX.hasClass(this.nextBtnCalc, 'disabled')){
                    BX.addClass(this.nextBtnCalc, 'disabled');
                    if(!!nextBtnCalcSpan && !!nextBtnDataSpan){
                        BX.remove(BX(nextBtnCalcSpan));
                        BX.remove(BX(nextBtnDataSpan));
                    }
                }
            }
        },

        checkFormDataUser: function () {
            let formDataUser = $('#'+this.blocks.BLOCK_DATA_USER+' > form').serializeArray({ checkboxesAsBools: true }), keyF, resCheck = true;

            for (keyF in formDataUser){
                switch (formDataUser[keyF].name) {
                    case 'KVIZ_NAME':
                        if(formDataUser[keyF].value === ''){
                            resCheck = false;
                        } else {
                            this.resultObj.DATA_USER[formDataUser[keyF].name] = formDataUser[keyF].value;
                        }

                        break;
                    case 'KVIZ_TEL':
                        const ruPhoneRegex = /^(\+7|7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
                        if(formDataUser[keyF].value === '' || !ruPhoneRegex.test(formDataUser[keyF].value)){
                            resCheck = false;
                        } else {
                            this.resultObj.DATA_USER[formDataUser[keyF].name] = formDataUser[keyF].value;
                        }

                        break;
                    case 'KVIZ_COMMENT':

                        this.resultObj.DATA_USER[formDataUser[keyF].name] = formDataUser[keyF].value;

                        break;
                    case 'KVIZ_POLITICA':
                        if(formDataUser[keyF].value === 'N'){
                            resCheck = false
                        } else {
                            this.resultObj.DATA_USER[formDataUser[keyF].name] = formDataUser[keyF].value;
                        }

                        break;
                }

                if(!resCheck){
                    break;
                }
            }

            if(!!resCheck){
                if(BX.hasClass(this.nextBtnData, 'disabled'))
                    BX.removeClass(this.nextBtnData, 'disabled');
            } else {
                if(!BX.hasClass(this.nextBtnData, 'disabled'))
                    BX.addClass(this.nextBtnData, 'disabled');
            }
        },

        next: function () {
            let nextQ = this.qsObj.find(q => q.NUM === this.activeQ + 1);

            if(!!nextQ && this.resultObj.ANSWERS['q_'+this.activeQ].ANSWER){
                this.activeQ++;
                if(this.activeQ > 1){
                    BX.removeClass(this.backBtn, 'dis');
                }
                BX.cleanNode(this.questionContentBlock);
                BX.append(nextQ.DOM, this.questionContentBlock);

                if(!this.resultObj.ANSWERS['q_'+this.activeQ].ANSWER){
                    BX.addClass(this.nextBtn, 'disabled');
                }
            }else if(!nextQ){
                let keyA, idRes = 1;
                this.activeQ++;
                BX.cleanNode(this.questionContentBlock);

                for(keyA in this.resultObj.ANSWERS){
                    if(Number(this.resultObj.ANSWERS[keyA].ANSWER) > 1){
                        idRes = 2;
                        break;
                    }
                }
                ym(102969881,'reachGoal','opros-lend');
                BX.append(this.resObj.find(r => r.RES === idRes).DOM, this.questionContentBlock);
                BX.adjust(this.blockTittle, { text: 'Результат опроса' } );
                BX.hide(this.blockBottom);
            }
        },

        nextCalc: function () {
            if('DATE_FORMAT_NO_WEEK'in this.resultObj.CALENDAR.DATE && 'TIME_FORMAT' in this.resultObj.CALENDAR.TIME && !BX.hasClass(this.nextBtnCalc, 'disabled')){

                let office = $('div#'+this.blocks.BLOCK_RECORDING+' input[type="radio"][name="OFFICE"]:checked')[0],
                    addressDom = !!office ? $(office).next()[0] : false,
                    address = !!addressDom ? addressDom.querySelector('span.kviz_office_address').innerText : false,
                    metro = !!addressDom ? Array.from(addressDom.querySelectorAll('div.kviz_office_metro-block > span.kviz_office_metro')) : false;

                if(!!address){
                    this.resultObj.CALENDAR.OFFICE = {
                        ADDRESS: String(address.trim()),
                        VALUE: String(office.value),
                        METRO: {}
                    };

                    this.blockResult.querySelector('span.kviz_office_address').innerText = this.resultObj.CALENDAR.OFFICE.ADDRESS;

                    if(!!metro && metro.length > 0){
                        for (let keyM in metro) {
                            this.resultObj.CALENDAR.OFFICE.METRO[keyM] = metro[keyM].innerText;

                            BX.append(BX.create('SPAN', {
                                attrs: {
                                    className: 'kviz_office_metro'
                                },
                                text: metro[keyM].innerText
                            }), this.blockResult.querySelector('div.kviz_office_metro-block'));
                        }
                    }
                }

                this.blockResult.querySelector('div.recording-date > span').innerText = this.resultObj.CALENDAR.DATE.DATE_FORMAT;
                this.blockResult.querySelector('div.recording-time > span').innerText = this.resultObj.CALENDAR.TIME.TIME_FORMAT;

                BX.removeClass(this.mainBlock, 'h-auto');
                this.backBtn.dataset.back = 'calendar';
                if(this.type === 'recording' && BX.hasClass(this.backBtn, 'dis')){
                    BX.removeClass(this.backBtn, 'dis');
                }
                BX.cleanNode(this.questionContentBlock);
                BX.append(this.blockDataUser, this.questionContentBlock);
            }
        },

        nextData: function () {
            this.checkFormDataUser();

            if(('KVIZ_NAME' in this.resultObj.DATA_USER && this.resultObj.DATA_USER.KVIZ_NAME.value !== '') &&
                ('KVIZ_TEL' in this.resultObj.DATA_USER && this.resultObj.DATA_USER.KVIZ_TEL.value !== '') &&
                ('KVIZ_POLITICA' in this.resultObj.DATA_USER && this.resultObj.DATA_USER.KVIZ_POLITICA.value !== 'N') &&
                (!BX.hasClass(this.nextBtnData, 'disabled'))){
                let slider = BX.SidePanel.Instance.getTopSlider(), formObj = {}, keyRes, keyResAns;
                slider.showLoader();

                for(keyRes in this.resultObj){
                    if(keyRes === 'ANSWERS'){
                        if(Object.keys(this.resultObj[keyRes]).length > 0){
                            formObj.ANSWERS = [];
                            for(keyResAns in this.resultObj[keyRes]){
                                formObj.ANSWERS.push(this.resultObj[keyRes][keyResAns]);
                            }
                        }
                    }

                    if(keyRes === 'CALENDAR'){
                        formObj.DATE = `${this.resultObj[keyRes].DATE.DATE_FORMAT} ${this.resultObj[keyRes].TIME.TIME_FORMAT}`;
                        formObj.OFFICE = this.resultObj[keyRes].OFFICE.ADDRESS;
                    }

                    if(keyRes === 'DATA_USER'){
                        formObj.NAME_USER = this.resultObj[keyRes].KVIZ_NAME;
                        formObj.TEL_USER = this.resultObj[keyRes].KVIZ_TEL;
                        formObj.COMMENT_USER = this.resultObj[keyRes].KVIZ_COMMENT;
                    }
                }

                BX.ajax.runComponentAction('refaced:vision.landing', 'sendMailRecording', {
                    mode: 'ajax',
                    data: {
                        form: formObj
                    }
                }).then(BX.proxy(function (responce) {
                    slider.closeLoader();
                    if(responce.status === 'success' && responce.data !== 'error'){
                        ym(102969881,'reachGoal','zapis-lend');
                        BX.addClass(this.backBtn, 'dis');
                        BX.cleanNode(this.questionContentBlock);
                        BX.append(this.blockResult, this.questionContentBlock);
                    } else {
                        BX.addClass(this.backBtn, 'dis');
                        BX.cleanNode(this.questionContentBlock);
                        BX.append(this.blockError, this.questionContentBlock);
                    }

                }, this), BX.proxy(function (err) {
                    slider.closeLoader();
                    BX.addClass(this.backBtn, 'dis');
                    BX.cleanNode(this.questionContentBlock);
                    BX.append(this.blockError, this.questionContentBlock);
                }, this));
            }
        },

        back: function (e) {
            if(e.currentTarget.dataset.back === ""){
                let prevQ = this.qsObj.find(q => q.NUM === this.activeQ - 1);

                if(!!prevQ){
                    this.activeQ--;
                    if(this.activeQ === 1){
                        BX.addClass(this.backBtn, 'dis');
                    }
                    BX.cleanNode(this.questionContentBlock);
                    BX.append(prevQ.DOM, this.questionContentBlock);

                    if(!this.resultObj.ANSWERS['q_'+this.activeQ].ANSWER){
                        BX.addClass(this.nextBtn, 'disabled');
                    } else {
                        if(BX.hasClass(this.nextBtn, 'disabled')){
                            BX.removeClass(this.nextBtn, 'disabled');
                        }

                        if(BX.isNodeHidden(this.blockBottom)){
                            BX.show(this.blockBottom);
                        }
                    }
                }
            } else {
                let dataBack = e.currentTarget.dataset.back;

                if(dataBack === 'result' && this.type !== 'recording'){
                    let keyA, idRes = 1;
                    for(keyA in this.resultObj.ANSWERS){
                        if(Number(this.resultObj.ANSWERS[keyA].ANSWER) > 1){
                            idRes = 2;
                            break;
                        }
                    }
                    BX.cleanNode(this.questionContentBlock);
                    BX.append(this.resObj.find(r => r.RES === idRes).DOM, this.questionContentBlock);
                    BX.adjust(this.blockTittle, { text: 'Результат опроса' } );
                    BX.removeClass(this.mainBlock, 'h-auto');
                    e.currentTarget.dataset.back = '';
                } else if(dataBack === 'calendar'){
                    e.currentTarget.dataset.back = 'result';
                    this.goRecording();
                }
            }
        },

        close: function () {
            let slider = BX.SidePanel.Instance.getTopSlider();
            if(!!slider && (slider.getUrl() === 'vision.slider.recording' || slider.getUrl() === 'vision.slider.kviz')){
                slider.close();
            }
        },

        closeAndRemove: function (){
            let slider = BX.SidePanel.Instance.getTopSlider();
            if(!!slider && (slider.getUrl() === 'vision.slider.recording' || slider.getUrl() === 'vision.slider.kviz')){
                slider.close();
                setTimeout(function () {
                    slider.destroy();
                }, 2000)
            }
        }
    }
})();