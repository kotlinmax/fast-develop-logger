import {IHttpRoute} from '../../infra/servers/cnrt/IHttpServer';
import {IBaseHttpRouter} from '../cntr/IBaseHttpRouter';

export default abstract class BaseHttpRouter implements IBaseHttpRouter {
  abstract readonly tag: string;
  abstract readonly routes: IHttpRoute[];
}
