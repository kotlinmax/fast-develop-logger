import {IBaseClass} from '../..';
import {IWsRoutes} from '../../../infra/servers/cnrt/IWsServer';

export interface IBaseWsRouter extends IBaseClass {
  routes: IWsRoutes;
}
