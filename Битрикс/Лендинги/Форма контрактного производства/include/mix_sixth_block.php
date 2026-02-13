<div class="mix-sixth-flex container-fluid">
    <div class="mix-sixth-info mix-flex mix-mw">
        <div class="mix-sixth-text-tittle">Варианты сотрудничества</div>
        <div class="mix-sixth-text-subtittle">Мы работаем как с крупными, так и с небольшими и начинающими заказчиками</div>
    </div>
</div>

<section class="splide mix-mw" id="mix-slide-second">
    <div class="splide__track">
        <ul class="splide__list">
            <li class="splide__slide">
                <div class="slide-main-block">
                    <div class="slide-img">
                        <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_sixth/images/block_first.png" alt="Только производство">
                    </div>
                    <div class="slide-info">
                        <div class="slide-tittle">Только производство</div>
                        <div class="slide-list">
                            <ul>
                                <li>Низкая стоимость единицы</li>
                                <li>Изготовление партии за 7 дней</li>
                                <li>Готовая рецептура</li>
                                <li>Современная упаковка на выбор</li>
                                <li>Неограниченный ассортимент</li>
                                <li class="cross">Сертификация продукции</li>
                                <li class="cross">Разработка полиграфии</li>
                                <li class="cross">Оклейка упаковки</li>
                            </ul>
                        </div>
                        <div class="slide-price"><span>от</span> 12'900<span>₽</span></div>
                        <div class="slide-button-block">
                            <div class="slide-button mix-flex" data-popup="get-price">Рассчитать стоимость</div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="splide__slide">
                <div class="slide-main-block">
                    <div class="slide-img">
                        <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_sixth/images/block_second.png" alt="Производство + сервис">
                    </div>
                    <div class="slide-info">
                        <div class="slide-tittle">Производство + сервис</div>
                        <div class="slide-list">
                            <ul>
                                <li>Низкая стоимость единицы</li>
                                <li>Изготовление партии за 7 дней</li>
                                <li>Готовая рецептура</li>
                                <li>Современная упаковка на выбор</li>
                                <li>Неограниченный ассортимент</li>
                                <li>Консультации по сертификации</li>
                                <li>Оклейка упаковки</li>
                                <li class="cross">Разработка полиграфии</li>
                            </ul>
                        </div>
                        <div class="slide-price"><span>от</span> 17'900<span>₽</span></div>
                        <div class="slide-button-block">
                            <div class="slide-button mix-flex" data-popup="get-price">Рассчитать стоимость</div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="splide__slide">
                <div class="slide-main-block">
                    <div class="slide-img">
                        <img src="<?=SITE_TEMPLATE_PATH?>/components/bitrix/main.include/block_sixth/images/block_third.png" alt="Бренд под ключ">
                    </div>
                    <div class="slide-info">
                        <div class="slide-tittle">Бренд под ключ</div>
                        <div class="slide-list">
                            <ul>
                                <li>Низкая стоимость единицы</li>
                                <li>Изготовление партии за 7 дней</li>
                                <li>Уникальная или готовая рецептура</li>
                                <li>Современная и премиум упаковка</li>
                                <li>Неограниченный ассортимент</li>
                                <li>Сертификация продукции</li>
                                <li>Разработка полиграфии</li>
                                <li>Оклейка упаковки</li>
                                <li>Разработка бренда</li>
                            </ul>
                        </div>
                        <div class="slide-price"><span>от</span> 39'000<span>₽</span></div>
                        <div class="slide-button-block">
                            <div class="slide-button mix-flex" data-popup="get-price">Рассчитать стоимость</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</section>

<script>
    var perPage__s = 1,
        arrows__s = true,
        height = '1028px';

    if(window.screen.width > 991){
        perPage__s = 3;
        arrows__s = false;
    }
    else if(window.screen.width < 380){
        height = '900px';
    }
    new Splide('#mix-slide-second', {
        width: '1440px',
        height: height,
        pagination: false,
        autoplay: false,
        lazyLoad: true,
        rewind: true,
        wheel: false,
        perPage: perPage__s,
        arrows: arrows__s,
        gap: '15px'
    }).mount();
</script>