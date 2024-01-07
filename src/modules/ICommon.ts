import {type EachMessagePayload, type KafkaMessage} from 'kafkajs';

import {IHttpRoute} from '../core/servers/interfaces/IHttpServer';
import {ILogger} from '../core/loggers/ILogger';
import {IProcessEnv} from '../core/env/IEnvironment';
import {ISQLDatabase} from '../core/databases/ISQLDatabase';
import {IWebSocketRoutes, TCallback} from '../core/servers/interfaces/IWebSocketServer';

/**
 * Here are only the general interfaces that are required in the modules
 * for example Router, Consumer, Module,  Producer, Service, Repository and etc.
 */

export interface IEachMessagePayload extends EachMessagePayload {}
export type TKafkaMessage = KafkaMessage;

export interface IHttpRouter {
  tag: string;
  routes: IHttpRoute[];
}
export interface IWebSocketRouter {
  tag: string;
  routes: IWebSocketRoutes;
}

// Module
export interface IModuleConstructor {
  logger: ILogger;
  env: IProcessEnv;
  db: ISQLDatabase;
}

export interface IModule {
  tag: string;
  httpRouter: IHttpRouter;
  wsRouter: IWebSocketRouter;
  consumers: IQueueConsumer[];
}

// Queue consumer
export interface IQueueConsumerConstructor {
  logger: ILogger;
  env: IProcessEnv;
}

export interface IQueueConsumer {
  tag: string;
  eachMessageHandler(payload: IEachMessagePayload): Promise<void>;
  run(): Promise<void>;
  setCallback(callback: TCallback): void;
}
