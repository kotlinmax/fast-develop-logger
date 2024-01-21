import {type RouteOptions, type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';
import {IBaseHttpRouter} from '../../../bases/cntr/routes/IBaseHttpRouter';

export interface IHttpFastifyServer extends FastifyInstance {}
export interface IHttpRequest extends FastifyRequest {}
export interface IHttpResponse extends FastifyReply {}
export interface IHttpRoute extends RouteOptions {}

export interface IHttpServer {
  app: FastifyInstance;
  registerRoutes: (router: IBaseHttpRouter) => void;
  start: () => Promise<void>;
}
