// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAnnounce from '../../../app/model/Announce';
import ExportAuditLog from '../../../app/model/AuditLog';
import ExportChat from '../../../app/model/Chat';
import ExportConfig from '../../../app/model/Config';
import ExportDialog from '../../../app/model/Dialog';
import ExportEmbedding1 from '../../../app/model/Embedding1';
import ExportEmbedding2 from '../../../app/model/Embedding2';
import ExportHTTPLog from '../../../app/model/HTTPLog';
import ExportPage from '../../../app/model/Page';
import ExportPayItem from '../../../app/model/PayItem';
import ExportPayment from '../../../app/model/Payment';
import ExportPhoneCode from '../../../app/model/PhoneCode';
import ExportPrompt from '../../../app/model/Prompt';
import ExportPromptType from '../../../app/model/PromptType';
import ExportResource from '../../../app/model/Resource';
import ExportResourceType from '../../../app/model/ResourceType';
import ExportUser from '../../../app/model/User';
import ExportUserResourceTab from '../../../app/model/UserResourceTab';

declare module 'egg' {
  interface IModel {
    Announce: ReturnType<typeof ExportAnnounce>;
    AuditLog: ReturnType<typeof ExportAuditLog>;
    Chat: ReturnType<typeof ExportChat>;
    Config: ReturnType<typeof ExportConfig>;
    Dialog: ReturnType<typeof ExportDialog>;
    Embedding1: ReturnType<typeof ExportEmbedding1>;
    Embedding2: ReturnType<typeof ExportEmbedding2>;
    HTTPLog: ReturnType<typeof ExportHTTPLog>;
    Page: ReturnType<typeof ExportPage>;
    PayItem: ReturnType<typeof ExportPayItem>;
    Payment: ReturnType<typeof ExportPayment>;
    PhoneCode: ReturnType<typeof ExportPhoneCode>;
    Prompt: ReturnType<typeof ExportPrompt>;
    PromptType: ReturnType<typeof ExportPromptType>;
    Resource: ReturnType<typeof ExportResource>;
    ResourceType: ReturnType<typeof ExportResourceType>;
    User: ReturnType<typeof ExportUser>;
    UserResourceTab: ReturnType<typeof ExportUserResourceTab>;
  }
}
