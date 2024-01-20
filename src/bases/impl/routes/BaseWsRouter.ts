import BaseClass from '../..';
import {IWsRoutes} from '../../../infra/servers/cnrt/IWsServer';
import {IBaseWsRouter} from '../../cntr/routes/IBaseWsRouter';

export default abstract class BaseWsRouter extends BaseClass implements IBaseWsRouter {
  public abstract routes: IWsRoutes;
}
