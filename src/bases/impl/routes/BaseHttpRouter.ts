import BaseClass from '../..';
import {IHttpRoute} from '../../../infra/servers/cnrt/IHttpServer';
import {IBaseHttpRouter} from '../../cntr/routes/IBaseHttpRouter';

export default abstract class BaseHttpRouter extends BaseClass implements IBaseHttpRouter {
  abstract readonly routes: IHttpRoute[];
}
