export interface IWebSocketRoutes {
  [key: string]: Record<string, () => Promise<void>>;
}

export interface IWebSocketServer {
  registerRoutes: (routes: IWebSocketRoutes) => void;
  start: () => Promise<void>;
}
