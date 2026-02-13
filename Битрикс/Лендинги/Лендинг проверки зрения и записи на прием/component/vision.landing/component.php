<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$arResult = array();
$template = $this->__templateName;

if($template === 'side.panel.kviz'){
    $dateNow = new DateTime();
    $dates = array();
    $times = array();
    $w = array(
        'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
    );
    $intlFormatter = new IntlDateFormatter('ru_RU', IntlDateFormatter::SHORT, IntlDateFormatter::SHORT);
    $cal = IntlCalendar::createInstance();
    $cal->setFirstDayOfWeek(IntlCalendar::DOW_MONDAY);
    $intlFormatter->setCalendar($cal);
    date_default_timezone_set('Europe/Moscow');
    for($i = 0; $i < 30; $i++){
        if($i > 0){
            $dateNow->modify('+ 1 day');
        }

        $intlFormatter->setPattern('cc');
        $weekDate = $intlFormatter->format($dateNow);

        $intlFormatter->setPattern('dd MMMM');
        $formatDate = $intlFormatter->format($dateNow);

        $dates[] = array(
            //'DATE_TIME_OBJ' => $dateNow,
            'TODAY' => $i === 0 ? 'Y' : 'N',
            'ADDED' => 'N',
            'TIMESTAMP' => $dateNow->getTimestamp(),
            'DATE_FORMAT' => $w[((int)$weekDate - 1)].', '.$formatDate,
            'DATE_FORMAT_NO_WEEK' => $formatDate
        );
    }

    $dateNow = new DateTime();
    $timesObj = new DateTime('today midnight');
    $timesObj->modify('+11 hours');

    //$timesObjNow = new DateTime('11:00');
    //$timesObj = roundUpDateTime($timesObjNow);
    while ($timesObj->format('H:i') <= '20:30') {
        $times[] = array(
            //'DATE_TIME_OBJ' => $timesObj,
            'BACK' => ($timesObj < $dateNow) ? 'Y' : 'N',
            'ADDED' => 'N',
            'TIMESTAMP' => $timesObj->getTimestamp(),
            'TIME_FORMAT' => $timesObj->format('H:i'),
            'TIME_END_FORMAT' => $timesObj->modify('+30 minutes')->format('H:i')
        );
        $timesObj->modify('-30 minutes');
        $timesObj->add(new DateInterval('PT30M')); // Добавляем 30 минут
    }

    /*for($i = 0; $i < 20; $i++){
        if($i > 0){
            $timesObj->modify('+30 minutes');
        }

        $times[] = array(
            //'DATE_TIME_OBJ' => $timesObj,
            'ADDED' => 'N',
            'TIMESTAMP' => $timesObj->getTimestamp(),
            'TIME_FORMAT' => $timesObj->format('H:i')
        );
    }*/

    $arResult['DATES_CALENDAR'] = $dates;
    $arResult['TIMES_CALENDAR'] = $times;
}

$this->includeComponentTemplate();