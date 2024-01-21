import BaseClass from '../..';
import {IWsRoutes} from '../../../infra/servers/cnrt/IWsktServer';
import {IBaseWsktRouter} from '../../cntr/routes/IBaseWsktRouter';

export default abstract class BaseWsktRouter extends BaseClass implements IBaseWsktRouter {
  public abstract routes: IWsRoutes;
}
