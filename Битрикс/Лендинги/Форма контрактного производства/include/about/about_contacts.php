<div class="container-fluid">
    <div class="container-lg ps-0 pe-0">
        <div class="mix-contacts-tittle pt-5 pb-5">Контакты</div>
        <div class="mix-info-contacts row row-cols-1 row-cols-md-3">
            <div class="mix-contacts-mail mb-3">
                <div class="row row-cols-2">
                    <div class="col-3 mix-contacts-icon mix-mail-icon"></div>
                    <div class="col-9">
                        <div class="mix-contacts-info mb-4">У вас остались вопросы или не нашли интересующей информации. Наш специалист ответит на все ваши вопросы.</div>
                        <div class="mix-contacts-info-link"><a href="mailto:info@mixon-lab.ru">info@mixon-lab.ru</a></div>
                    </div>
                </div>
            </div>
            <div class="mix-contacts-phone mb-3">
                <div class="row row-cols-2">
                    <div class="col-3 mix-contacts-icon mix-phone-icon"></div>
                    <div class="col-9">
                        <div class="mix-contacts-info mb-4">Также вы можете позвонить в наш офис и задать интересующие вас вопросы нашему оператору на линии.</div>
                        <div class="mix-contacts-info-link"><a href="tel:89227421468">8(922)742-14-68</a></div>
                    </div>
                </div>
            </div>
            <div class="mix-contacts-social mb-3">
                <div class="row row-cols-2">
                    <div class="col-3 mix-contacts-icon mix-soc-icon"></div>
                    <div class="col-9">
                        <div class="mix-contacts-info mb-4">Еще больше информации о компании, продукции и наших услугах в наших социальных сетях</div>
                        <div class="mix-contacts-info-link"><a target="_blank" href="https://vk.com/mixon_lab">Перейти в группу</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mix-form-feedback position-relative" style="height:200px;">
            <?$APPLICATION->IncludeComponent("bitrix:main.include", "form_feedback",
                array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => SITE_DIR."include/forms/form_feedback.php",
                    "P_ABSOLUTE" => "Y",
                    "BORDER" => "N",
                    "TITTLE" => 'Обратная связь',
                    "DISABLE" => "N",
                    "BUTTON_NAME" => "Отправить"
                ),
                false,
                array("HIDE_ICONS" => "Y")
            );?>
        </div>
    </div>
    <div class="mix-contacts-map mt-5">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3ASa2-j0xn6oo7zfmGbr_SxAp63IFtMAYw&amp;source=constructor" width="100%" height="720" frameborder="0"></iframe>
    </div>
</div>