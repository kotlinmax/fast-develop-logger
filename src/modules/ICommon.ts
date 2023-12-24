import {type EachMessagePayload} from 'kafkajs';
import {IHttpRoute} from '../infrastructure/servers/IHttpServer';

export interface IEachMessagePayload extends EachMessagePayload {}

export interface IModule {
  tag: string;
  router: IHttpRouter;
  consumers: IQueueConsumer[];
}

export interface IHttpRouter {
  tag: string;
  httpRoutes: IHttpRoute[];
}

export interface IQueueConsumer {
  tag: string;
  eachMessageHandler(payload: IEachMessagePayload): Promise<void>;
  run(): Promise<void>;
}
