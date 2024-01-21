import {IBaseWsktRouter} from '../../../bases/cntr/routes/IBaseWsktRouter';

export type TCallback = (msg: unknown) => void;
export type TWsUnsubscribe = Promise<() => Promise<void>>;
export type TWsktSubscribeCallback = (channel: string, callback: TCallback) => TWsUnsubscribe;

export interface IWsRoutes {
  [key: string]: {
    channels: Record<string, string>;
    actions: Record<string, Function | undefined>;
  };
}

export interface IWsktServer {
  registerRoutes: (router: IBaseWsktRouter) => void;
  start: () => Promise<void>;
}
