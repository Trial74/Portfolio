BX.ready(function() {

    document.documentElement.style.touchAction = 'pan-y';

   let controller = new ScrollMagic.Controller(),
       revealElementsLeft = document.getElementsByClassName("digit-t-left"),
       revealElementsRight = document.getElementsByClassName("digit-t-right"),
       revealElementsDown = document.getElementsByClassName("digit-t-down"),
       result = [...revealElementsLeft, ...revealElementsRight, ...revealElementsDown],
       i = 0, offset = 1, triggerHook = 0.9, scrollNode = document.querySelector('div.scroll_bar_block'), w = window.screen.width;

   let scrollbar = Scrollbar.init(scrollNode, {
           damping: 0.08,
           syncCallbacks: true
       }),
       btnFixed = $('div.ld-button.btn-fixed'),
       btnFixetParentBlock = btnFixed.parent();

   let iframeTop = Array.from(document.querySelectorAll('.iframe-overlay.top')),
       iframeContent = Array.from(document.querySelectorAll('.iframe-overlay.content')), top, content;

   if(iframeTop.length > 0){
       for(top in iframeTop){
           iframeTop[top].addEventListener('click', (e) => {
               window.open('https://yandex.ru/maps/org/refaced/1290401932?utm_source=maps-reviews-widget&utm_medium=reviews&utm_content=org-name', '_self');
           });
       }
   }

    if(iframeContent.length > 0){
        for(content in iframeContent){
            iframeContent[content].addEventListener('click', (e) => {
                window.open('https://yandex.ru/maps/org/refaced/1290401932/reviews?utm_source=maps-reviews-widget&utm_medium=reviews&utm_content=add_review&add-review', '_self');
            });
        }
    }

   scrollbar.addListener( status => {
        const offset = status.offset;
        if(btnFixetParentBlock.offset().top < 5){
            if(btnFixed.css('position') !== 'fixed'){
                btnFixed
                    .css('width', btnFixed.width())
                    .css('position', 'fixed')
                    .css('left', `${ w < 920 ? (btnFixetParentBlock.offset().left) : (btnFixetParentBlock.offset().left - btnFixed.outerWidth(true)) }px`)
                    .css('z-index', '10');
                btnFixetParentBlock.css('height', `${btnFixed.outerHeight(true)}px`);
            }
            btnFixed.css('top', `${ (offset.y + 10) }px`);
        } else {
            if(btnFixed.css('position') === 'fixed'){
                btnFixed.css('position', '')
                    .css('top', '')
                    .css('left', '')
                    .css('z-index', '');

                btnFixetParentBlock.css('height', '');
            }
        }
   });

   for (i; i < result.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: result[i],
            offset: offset,
            triggerHook: triggerHook,
            reverse: false
        })
            .setClassToggle(result[i], "visible")
            .addTo(controller);
   }

   let btnSign = $('div.ld-button[data-event="signup"]');

    btnSign.on('click', function (e) {
        if(!!e.currentTarget.dataset.data){
            let dataType = e.currentTarget.dataset.data;
            BX.SidePanel.Instance.open("vision.slider."+dataType, {
                contentCallback: function (slider) {
                    return new Promise(function(resolve, reject) {
                        BX.ajax.runComponentAction('refaced:vision.landing', 'getComponent', {
                            data: {
                                type: dataType
                            }
                        }).then(function(response) {
                            resolve( { html: response.data.html } );
                        }, function (response) {
                            reject( 'Произошла ошибка' );
                        });
                    });
                },
                animationDuration: 300,
                cacheable: true,
                autoFocus: true,
                allowChangeHistory: false,
                allowCrossOrigin: false,
                width: w < 920 ? w : (w - 100),
                mobileFriendly: true,
                label: false,
            });
        }
    });

    let btnDev = $('#dev');
    if(!!btnDev){
        btnDev.on('click', function () {
            const event = {
                title: "Встреча",
                start: "2024-06-20T10:00:00",
                end: "2024-06-20T11:30:00",
                description: "Обсуждение проекта",
                location: "Офис"
            };

            // .ics файл
            const icsContent = generateICSEvent(event);
            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'event.ics';
            link.click();
        });
    }

    function generateICSEvent(event) {
        return [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${event.start.replace(/-/g, '').replace(/:/g, '')}`,
            `DTEND:${event.end.replace(/-/g, '').replace(/:/g, '')}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');
    }

    //Форма записи была как заглушка пока небыло квиза старт
   if(false && !!Array.from(btnSign).length > 0){
       let popupWindow,
           popupWindowContent,
           openCalendar;

       openCalendar = (e) => {

           BX.calendar({
               node: e.target,
               field: e.target,
               bTime: true,
               bHideTime: false
           });
       }

       popupWindowContent = BX.create('DIV', {
           attrs: {
               className: 'popup_content_block_landing'
           },
           children: [
               BX.create('DIV', {
                   attrs: {
                       className: 'popup_content_block_landing-form'
                   },
                   children: [
                       BX.create('FORM', {
                           attrs: {
                               className: 'ui-form'
                           },
                           children: [
                               BX.create('DIV', {
                                   attrs: {
                                       className: 'ui-form-row'
                                   },
                                   children: [
                                       BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-form-label'
                                           },
                                           children: [
                                               BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-ctl-label-text'
                                                   },
                                                   text: 'Введите Ваше имя'
                                               })
                                           ]
                                       }),
                                       BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-form-content'
                                           },
                                           children: [
                                               BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-ctl ui-ctl-textbox'
                                                   },
                                                   children: [
                                                       BX.create('INPUT', {
                                                           attrs: {
                                                               className: 'ui-ctl-element',
                                                               name: 'L_NAME',
                                                               type: 'text',
                                                               placeholder: 'Имя'
                                                           },
                                                       })
                                                   ]
                                               }),
                                           ]
                                       }),
                                   ]
                               }),
                               BX.create('DIV', {
                                   attrs: {
                                       className: 'ui-form-row'
                                   },
                                   children: [
                                       BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-form-label'
                                           },
                                           children: [
                                               BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-ctl-label-text'
                                                   },
                                                   text: 'Введите телефон для связи'
                                               })
                                           ]
                                       }),
                                       BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-form-content'
                                           },
                                           children: [
                                               BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-ctl ui-ctl-textbox'
                                                   },
                                                   children: [
                                                       BX.create('INPUT', {
                                                           attrs: {
                                                               className: 'ui-ctl-element',
                                                               name: 'L_TEL',
                                                               type: 'text',
                                                               placeholder: '+7 (___) ___-____'
                                                           }
                                                       })
                                                   ]
                                               })
                                           ]
                                       })
                                   ]
                               }),
                               BX.create('DIV', {
                                   attrs: {
                                       className: 'ui-form-row'
                                   },
                                   children: [
                                       BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-form-label'
                                           },
                                           children: [
                                               BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-ctl-label-text'
                                                   },
                                                   text: 'Укажите желаемую дату записи'
                                               })
                                           ]
                                       }),
                                       BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-form-content'
                                           },
                                           children: [
                                               BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-ctl ui-ctl-after-icon ui-ctl-datetime'
                                                   },
                                                   children: [
                                                       BX.create('DIV', {
                                                           attrs: {
                                                               className: 'ui-ctl-after ui-ctl-icon-calendar'
                                                           },
                                                       }),
                                                       BX.create('INPUT', {
                                                           attrs: {
                                                               className: 'ui-ctl-element',
                                                               name: 'L_DATETIME',
                                                               type: 'text',
                                                               placeholder: 'Дата записи'
                                                           },
                                                           events: {
                                                               click: BX.proxy(openCalendar, this)
                                                           },
                                                       })
                                                   ]
                                               })
                                           ]
                                       })
                                   ]
                               })
                           ]
                       })
                   ]
               })
           ]
       });

       popupWindow = BX.PopupWindowManager.create("popup-sign_up", null, {
           content: popupWindowContent,
           titleBar: 'Запись на проверку зрения',
           zIndex: 0,
           autoHide : true,
           offsetTop : 1,
           offsetLeft : 0,
           lightShadow : true,
           closeIcon : true,
           closeByEsc : true,
           draggable: {restrict: false},
           overlay: {
               backgroundColor: 'black',
               opacity: '80'
           },
           buttons: [
               new BX.PopupWindowButton({
                   text: "Записаться",
                   className: "ui-btn ui-btn-primary-dark",
                   events: {
                       click: function(e){
                           let form = $('#popup-sign_up form').serializeArray(),
                               btn = e.target;

                           $(btn).addClass('ui-btn-wait');

                           if(!!form && form.length === 3){
                                let key, error = false;

                                for(key in form){
                                    if(form[key].value === ''){
                                        error = true;

                                        $('#popup-sign_up input[name="'+form[key].name+'"]').parent().addClass('ui-ctl-warning');

                                        if($('#popup-sign_up input[name="'+form[key].name+'"]').parent().hasClass('ui-ctl-success')){
                                            $('#popup-sign_up input[name="'+form[key].name+'"]').parent().removeClass('ui-ctl-success');
                                        }
                                    } else {
                                        if($('#popup-sign_up input[name="'+form[key].name+'"]').parent().hasClass('ui-ctl-warning')){
                                            $('#popup-sign_up input[name="'+form[key].name+'"]').parent().removeClass('ui-ctl-warning');
                                        }

                                        $('#popup-sign_up input[name="'+form[key].name+'"]').parent().addClass('ui-ctl-success');
                                    }
                                }

                               if(!error){
                                   BX.ajax.runComponentAction('refaced:vision.landing', 'addRecording', {
                                       mode: 'ajax',
                                       data: {
                                           form: form
                                       }
                                   }).then(function (response) {
                                       $(btn).remove();

                                       if(!response.data.error){
                                           let form = $('#popup-sign_up form'),
                                               successAlerts = BX.create('DIV', {
                                                   attrs: {
                                                       className: 'ui-alert ui-alert-success'
                                                   },
                                                   children: [
                                                       BX.create('SPAN', {
                                                           attrs: {
                                                               className: 'ui-alert-message'
                                                           },
                                                           text: 'Заявка успешна отправлена.'
                                                       })
                                                   ]
                                               });

                                           form.css('height', form.height());
                                           form.html(successAlerts);

                                           setTimeout(function () {
                                               popupWindow.close();
                                           }, 2000)

                                       } else {
                                           let dangerAlerts = BX.create('DIV', {
                                               attrs: {
                                                   className: 'ui-alert ui-alert-danger'
                                               },
                                               children: [
                                                   BX.create('SPAN', {
                                                       attrs: {
                                                           className: 'ui-alert-message'
                                                       },
                                                       html: 'Произошла ошибка.<br />Обновите страницу и попробуйте ещё раз'
                                                   })
                                               ]
                                           });

                                           $('#popup-sign_up form').after(dangerAlerts);
                                       }
                                   }, function (response) {
                                       $(btn).removeClass('ui-btn-wait');
                                       let dangerAlerts = BX.create('DIV', {
                                           attrs: {
                                               className: 'ui-alert ui-alert-danger'
                                           },
                                           children: [
                                               BX.create('SPAN', {
                                                   attrs: {
                                                       className: 'ui-alert-message'
                                                   },
                                                   html: 'Произошла ошибка.<br />Обновите страницу и попробуйте ещё раз'
                                               })
                                           ]
                                       });

                                       $('#popup-sign_up form').after(dangerAlerts);
                                   });
                               } else {
                                   $(btn).removeClass('ui-btn-wait');
                               }
                           }
                       }
                   }
               })
           ]
       });

       btnSign.on('click', function () {
           popupWindow.show();
       });

       $('input[name="L_TEL"]').mask("+7 (999) 999-9999");
   }
    //Форма записи была как заглушка пока небыло квиза конец

    if (typeof landRequest === 'object' && landRequest !== null && 'action' in landRequest) {
        if(landRequest.action === 'recording'){
            BX.SidePanel.Instance.open("vision.slider."+landRequest.action, {
                contentCallback: function (slider) {
                    return new Promise(function(resolve, reject) {
                        BX.ajax.runComponentAction('refaced:vision.landing', 'getComponent', {
                            data: {
                                type: landRequest.action
                            }
                        }).then(function(response) {
                            resolve( { html: response.data.html } );
                        }, function (response) {
                            reject( 'Произошла ошибка' );
                        });
                    });
                },
                animationDuration: 300,
                cacheable: true,
                autoFocus: true,
                allowChangeHistory: false,
                allowCrossOrigin: false,
                width: w < 920 ? w : (w - 100),
                mobileFriendly: true,
                label: false,
            });
        }
    }
})