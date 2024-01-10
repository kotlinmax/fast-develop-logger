import {IWsRoutes} from '../../infra/servers/cnrt/IWsServer';

export interface IBaseWsRouter {
  tag: string;
  routes: IWsRoutes;
}
