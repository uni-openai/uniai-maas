// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-watcher';
import 'egg-multipart';
import 'egg-security';
import 'egg-development';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-static';
import 'egg-jsonp';
import 'egg-view';
import '@eggjs/tegg-plugin';
import '@eggjs/tegg-config';
import '@eggjs/tegg-controller-plugin';
import '@openai-link/egg-sequelize-ts';
import 'egg-view-nunjucks';
import 'egg-cors';
import { EggPluginItem } from 'egg';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    tegg?: EggPluginItem;
    teggConfig?: EggPluginItem;
    teggController?: EggPluginItem;
    teggSchedule?: EggPluginItem;
    eventbusModule?: EggPluginItem;
    aopModule?: EggPluginItem;
    tracer?: EggPluginItem;
    sequelize?: EggPluginItem;
    nunjucks?: EggPluginItem;
    cors?: EggPluginItem;
  }
}