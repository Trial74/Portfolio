<div class="mix-fifth-flex">
    <div class="mix-fifth-info mix-flex mix-mw">
        <div class="mix-fifth-text-tittle">Наши преимущества</div>
    </div>
</div>
<section class="splide mix-mw" id="mix-slide-first">
    <div class="splide__track">
        <ul class="splide__list">
            <li class="splide__slide">
                <div class="slide-img">
                    <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_fifth/images/slider/slide_1.png" alt="">
                </div>
                <div class="slide-info">
                    <div class="slide-tittle">Низкий порог входа</div>
                    <div class="slide-subtittle">Принимаем заказы на изготовление контрактной продукции от 12 900 рублей</div>
                </div>
            </li>
            <li class="splide__slide">
                <div class="slide-img">
                    <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_fifth/images/slider/slide_2.png" alt="">
                </div>
                <div class="slide-info">
                    <div class="slide-tittle">Полный цикл</div>
                    <div class="slide-subtittle">Производство полного цикла позволяет выпускать продукцию готовую к продаже: от разработки рецепта до упаковки и дизайна</div>
                </div>
            </li>
            <li class="splide__slide">
                <div class="slide-img">
                    <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_fifth/images/slider/slide_3.png" alt="">
                </div>
                <div class="slide-info">
                    <div class="slide-tittle">Высокое качество</div>
                    <div class="slide-subtittle">Производим косметику на современном, высокотехнологичном оборудовании</div>
                </div>
            </li>
            <li class="splide__slide">
                <div class="slide-img">
                    <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_fifth/images/slider/slide_4.png" alt="">
                </div>
                <div class="slide-info">
                    <div class="slide-tittle">Эксклюзивность</div>
                    <div class="slide-subtittle">Разработаем уникальный продукт по вашему техническому заданию</div>
                </div>
            </li>
        </ul>
    </div>
</section>
<script>
    var perPage = 1,
        arrows = true;
    if(window.screen.width > 991){
        perPage = 4;
        arrows = false;
    }
    new Splide('#mix-slide-first', {
        width: '1440px',
        height: '580px',
        pagination: false,
        autoplay: false,
        lazyLoad: true,
        rewind: true,
        wheel: false,
        perPage: perPage,
        arrows: arrows,
        gap: '15px'
    }).mount();
</script>