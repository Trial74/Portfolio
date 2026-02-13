<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use VladClasses\CRest;
class VisionLandingAjaxController extends \Bitrix\Main\Engine\Controller
{
    public function configureActions(): array
    {

        return [
            'getComponent' => [
                'prefilters' => [],
                'postfilters' => []
            ],
            'sendMailRecording' => [
                'prefilters' => [],
                'postfilters' => []
            ],
            'addRecording' => [
                'prefilters' => [],
                'postfilters' => []
            ]
        ];
    }

    public function getComponentAction($type)
    {
        return new \Bitrix\Main\Engine\Response\Component('refaced:vision.landing', 'side.panel.kviz', ["TYPE" => $type]);
    }

    public function sendMailRecordingAction($form)
    {
        if(!empty($form) && is_array($form)) {
            $leadComments = 'Дата записи: '.$form['DATE'].' Комментарий пользователя: '.$form['COMMENT_USER'].'. ';
            $answers = '';
            if(!empty($form['ANSWERS']) && is_array($form['ANSWERS'])) {
                $answers = '<table border="1">';
                foreach ($form['ANSWERS'] as $answer) {
                    $answers .= '<tr>';
                    $answers .= '<td style="padding: 10px;">' . $answer['QUESTION_text'] . '</td>';
                    $answers .= '<td style="padding: 10px;">' . $answer['ANSWER_text'] . '</td>';
                    $answers .= '</tr>';

                    $leadComments .= $answer['QUESTION_text'].': '.$answer['ANSWER_text'].'. ';
                }
                $answers .= '</table>';
            }

            $arFeedForm = array(
                "USER_NAME" => $form['NAME_USER'] ?? '',
                "USER_PHONE" => $form['TEL_USER'] ?? '',
                "USER_COMMENT" => $form['COMMENT_USER'] ?? '',
                "DATA_RECORD" => $form['DATE'] ?? '',
                "OFFICE" => $form['OFFICE'] ?? '',
                "ANSWERS_TO_QUESTIONS" => $answers
            );

            $resultAdd = CRest::call(
                'crm.lead.add',
                [
                    'fields' => [
                        'TITLE' => 'Запись на проверку зрения - '.$form['NAME_USER'],
                        'NAME' => $form['NAME_USER'],
                        'STATUS_ID' => 'NEW',
                        'OPENED' => 'Y',
                        'ASSIGNED_BY_ID' => 1,
                        'PHONE' => [
                            [
                                'VALUE' => '+78999998998',
                                'VALUE_TYPE' => 'MOBILE',
                            ]
                        ],
                        'COMMENTS' => $leadComments
                    ]
                ]
            );
            
            if($resultAdd['result']){
                $arFeedForm['ADD_LEAD'] = 'Добавлен лид с ID '.$resultAdd['result'].': <a href="https://b24-jxm886.bitrix24.ru/crm/lead/details/'.$resultAdd['result'].'/" target="_blank">Перейти на портал</a>';
            } else {
                $arFeedForm['ADD_LEAD'] = 'Ошибка добавления лида на портал';
            }

            return CEvent::Send('SEND_RECORDING', 's1', $arFeedForm);
        }

        return 'error';
    }

    public function addRecordingAction($form): array
    {
        \Bitrix\Main\Loader::includeModule('iblock');

        $el = new CIBlockElement;
        $error = false;

        $PROP = array();

        foreach ($form as $element) {
            switch ($element['name']){
                case 'L_NAME':
                    $PROP[468] = $element['value']; // L_NAME
                    break;
                case 'L_TEL':
                    $PROP[469] = $element['value']; // L_TEL
                    break;
                case 'L_DATETIME':
                    $PROP[470] = $element['value']; // L_DATETIME
                    break;
            }
        }

        $arLoadProductArray = Array(
            "MODIFIED_BY"    => 1,
            "IBLOCK_SECTION_ID" => false,
            "IBLOCK_ID"      => 27,
            "PROPERTY_VALUES"=> $PROP,
            "NAME"           => "Новая запись на ".$PROP[470],
            "ACTIVE"         => "Y",
        );

        if($PRODUCT_ID = $el->Add($arLoadProductArray)){
            $mess = $PRODUCT_ID;
        } else {
            $error = true;
            $mess = $el->LAST_ERROR;
        }

        return [
            'error' => $error,
            'mess' => $mess,
        ];
    }
}