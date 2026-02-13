BX.ready(function(){
    let w = window.screen.width;

    $('#block_fo-content-id').moreContent({
        shadow: true,
        textClose: '<div class="ld-button-lable-block arrow-down-right"><span>Раскрыть</span></div>',
        textOpen: '<div class="ld-button-lable-block arrow-up-right"><span>Свернуть</span></div>',
        height: w <= 1280 ? 160 : 296,
        useCss: false,
        tpl: {
            shadow: '<div class="block_fo-content-left-text-shadow"></div>',
            btn: '<div class="ld-button gray w-full h-32"></div>',
            btnWrap: '<div class="block_fo-content-left-btn-wrap"></div>',
            controls: '<div class="block_fo-content-left-btn-control"></div>',
            content: '<div class="block_fo-content-left-text-content"></div>',
            contentWrap: '<div class="block_fo-content-left-text-wrap"></div>',
        }
    });

    $( "#se-left-accordion" ).accordion({
        collapsible: true,
        active: false,
        header: "span",
        icons: false,
        heightStyle: "content"
    });

    if(w <= 1280){
        $('#con_block_s-owl').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            items: w < 600 ? 1 : (w > 600 && w < 1280 ? 2 : 3),
            stagePadding: 15,
            margin: 16,
            onInitialized: function (e) {
                /*var itemsAccordion = Array.from($('.con_block_s-content-item.item')),
                    key, h = 0;
                for (key in itemsAccordion){
                    if(itemsAccordion[key].offsetHeight > h){
                        h = itemsAccordion[key].offsetHeight;
                    }
                }

                if(h > 0){
                    for (key in itemsAccordion){
                        itemsAccordion[key].style.height = h;
                    }
                }*/
            }
        });
    }
})