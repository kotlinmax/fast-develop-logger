export type TQueueRouterHandler = () => Promise<void>;

export interface IConsumerConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topic: string;
}

export interface IQueueRoutes {
  [key: string]: {
    middlewares: TQueueRouterHandler[];
    handler: TQueueRouterHandler;
  };
}
