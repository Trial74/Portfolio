/*** 24.12.2024 / UF.js from trial for UazFan project ***/

import '@/Core/UF';
import { StaticsMethodsNode, InstanceMethodsNode } from '@/Core/Node';
import { StaticsMethodsForm, InstanceMethodsForm } from '@/Core/Form';
import { StaticsMethodsText, InstanceMethodsText } from '@/Core/Text';
import { StaticsMethodsNumber, InstanceMethodsNumber } from '@/Core/Numbers';
import { StaticsMethodsToast, InstanceMethodsToast } from '@/Core/Toast';
import { StaticsMethodsObject, InstanceMethodsObject } from '@/Core/Objects';
import { StaticsMethodsDate, InstanceMethodsDate } from '@/Core/Date';
import { StaticsMethodsOther, InstanceMethodsOther } from '@/Core/Other';

Object.assign(window.UF,
    StaticsMethodsNode,
    StaticsMethodsForm,
    StaticsMethodsText,
    StaticsMethodsNumber,
    StaticsMethodsToast,
    StaticsMethodsObject,
    StaticsMethodsDate,
    StaticsMethodsOther
);

Object.assign(window.UF.fn,
    InstanceMethodsNode,
    InstanceMethodsForm,
    InstanceMethodsText,
    InstanceMethodsNumber,
    InstanceMethodsToast,
    InstanceMethodsObject,
    InstanceMethodsDate,
    InstanceMethodsOther
);
