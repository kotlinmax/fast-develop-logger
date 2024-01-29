import {IBaseQueueRouter} from '../../../bases/cntr/routes/IBaseQueueRouter';

export type TQueueRouterHandler = <T>(payload: T | T[]) => Promise<void>;

export interface IConsumerConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topic: string;
}

export interface IQueueRoute<T> {
  options: {
    isBatching: boolean;
  };
  middlewares: TQueueRouterHandler[];
  handler: (payload: T | T[]) => Promise<void>;
}

export interface IQueueRoutes<T> {
  [key: string]: IQueueRoute<T>;
}

export interface IQueueMsg {
  action: string;
  payload: Record<string, unknown>;
}

export interface IQueueServer {
  registerRoutes: (routers: IBaseQueueRouter) => void;
  start: () => Promise<void>;
}
