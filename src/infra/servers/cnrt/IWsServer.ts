export type TCallback = (msg: unknown) => void;
export type TWsUnsubscribe = Promise<() => Promise<void>>;
export type TWsSubscribeCallback = (channel: string, callback: TCallback) => TWsUnsubscribe;

export interface IWsRoutes {
  [key: string]: {
    channels: Record<string, string>;
    actions: Record<string, Function | undefined>;
  };
}

export interface IWsServer {
  registerRoutes: (routes: IWsRoutes) => void;
  start: () => Promise<void>;
}
