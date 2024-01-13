import {IHttpRoute} from '../../../infra/servers/cnrt/IHttpServer';

export interface IBaseHttpRouter {
  tag: string;
  routes: IHttpRoute[];
}
