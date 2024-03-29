// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAgent from '../../../app/controller/Agent';
import ExportIndex from '../../../app/controller/Index';
import ExportPay from '../../../app/controller/Pay';
import ExportUniAI from '../../../app/controller/UniAI';
import ExportWeChat from '../../../app/controller/WeChat';
import ExportWeb from '../../../app/controller/Web';

declare module 'egg' {
  interface IController {
    agent: ExportAgent;
    index: ExportIndex;
    pay: ExportPay;
    uniAI: ExportUniAI;
    weChat: ExportWeChat;
    web: ExportWeb;
  }
}
