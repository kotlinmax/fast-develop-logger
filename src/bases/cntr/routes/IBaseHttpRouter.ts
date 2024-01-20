import {IBaseClass} from '../..';
import {IHttpRoute} from '../../../infra/servers/cnrt/IHttpServer';

export interface IBaseHttpRouter extends IBaseClass {
  routes: IHttpRoute[];
}
