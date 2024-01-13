import {IWsRoutes} from '../../../infra/servers/cnrt/IWsServer';
import {IBaseWsRouter} from '../../cntr/routes/IBaseWsRouter';

export default abstract class BaseWsRouter implements IBaseWsRouter {
  public abstract tag: string;
  public abstract routes: IWsRoutes;
}
