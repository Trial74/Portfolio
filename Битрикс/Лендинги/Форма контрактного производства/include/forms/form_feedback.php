<div class="container-lg p-5 mix-form-feedback-inputs<?=$arParams['BORDER'] == 'Y' ? ' mix-mix-border':''?><?=$arParams['P_ABSOLUTE'] == 'Y' ? ' position-absolute':''?>">
    <div class="mix-form-feedback-inputs-tittle mix-size-tittle-36 mt-4 mb-4 ms-md-5" style="color:black;"><?=$arParams['TITTLE']?></div>
    <div class="row row-cols-1 row-cols-md-3 ms-md-5 me-md-5">
        <div class="col px-3 text-field__icon text-field__icon_name form-static">
            <input type="text" class="form-control-lg text-field__input mt-0 w-100 mb-2 mt-2" name="CONTACTS-NAME" placeholder="Имя"<?=$arParams['DISABLE'] == 'Y' ? ' disabled' : '' ?>>
        </div>
        <div class="col px-3 text-field__icon text-field__icon_phone form-static">
            <input type="text" class="form-control-lg text-field__input mt-0 w-100 mb-2 mt-2" name="CONTACTS-PHONE" placeholder="Телефон"<?=$arParams['DISABLE'] == 'Y' ? ' disabled' : '' ?>>
        </div>
        <div class="col px-3 text-field__icon text-field__icon_email form-static">
            <input type="text" class="form-control-lg text-field__input mt-0 w-100 mb-2 mt-2" name="CONTACTS-MAIL" placeholder="Email"<?=$arParams['DISABLE'] == 'Y' ? ' disabled' : '' ?>>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 mt-4 ms-md-5 me-md-5 justify-content-between">
        <div class="col w-auto gap-3 d-flex align-items-center pt-0 pt-lg-4">
            <input class="form-check-input" type="checkbox" value="" name="CONTACTS-PERS" id="check-contacts" checked />
            <label class="form-check-label" for="check-contacts">Даю согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности</label>
        </div>
        <div class="col w-auto">
            <div id="<?=$itemIds['BUTTON_ID']?>" class="mix-form-button-block mix-flex"><?=$arParams['BUTTON_NAME']?></div>
        </div>
    </div>
</div>