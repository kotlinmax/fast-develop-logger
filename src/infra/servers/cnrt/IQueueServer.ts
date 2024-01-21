import {IBaseQueueRouter} from '../../../bases/cntr/routes/IBaseQueueRouter';

export type TQueueRouterHandler = (...[]: unknown[]) => Promise<void>;

export interface IConsumerConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topic: string;
}

export interface IQueueRoute {
  options: {
    isBatching: boolean;
  };
  middlewares: TQueueRouterHandler[];
  handler: TQueueRouterHandler;
}

export interface IQueueRoutes {
  [key: string]: IQueueRoute;
}

export interface IQueueMsg {
  action: string;
}

export interface IQueueServer {
  registerRoutes: (routers: IBaseQueueRouter) => void;
  start: () => Promise<void>;
}
