// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAdmin from '../../../app/controller/Admin';
import ExportIndex from '../../../app/controller/Index';
import ExportLeChat from '../../../app/controller/LeChat';
import ExportLongText from '../../../app/controller/LongText';
import ExportUniAI from '../../../app/controller/UniAI';
import ExportWeChat from '../../../app/controller/WeChat';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    index: ExportIndex;
    leChat: ExportLeChat;
    longText: ExportLongText;
    uniAI: ExportUniAI;
    weChat: ExportWeChat;
  }
}
