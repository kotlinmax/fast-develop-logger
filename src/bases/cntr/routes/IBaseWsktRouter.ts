import {IBaseClass} from '../..';
import {IWsRoutes} from '../../../infra/servers/cnrt/IWsktServer';

export interface IBaseWsktRouter extends IBaseClass {
  routes: IWsRoutes;
}
