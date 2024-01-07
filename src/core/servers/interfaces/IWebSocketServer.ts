export type TCallback = (msg: unknown) => void;
export type TWebSocketUnsubscribe = Promise<() => Promise<void>>;
export type TWebSocketSubscribeCallback = (channel: string, callback: TCallback) => TWebSocketUnsubscribe;

export interface IWebSocketRoutes {
  [key: string]: {
    channels: Record<string, string>;
    actions: Record<string, TWebSocketSubscribeCallback | undefined>;
  };
}

export interface IWebSocketServer {
  registerRoutes: (routes: IWebSocketRoutes) => void;
  start: () => Promise<void>;
}
