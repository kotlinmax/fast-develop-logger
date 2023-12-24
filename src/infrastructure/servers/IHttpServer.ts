import {type RouteOptions, type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';

export interface IHttpFastifyServer extends FastifyInstance {}
export interface IHttpRequest extends FastifyRequest {}
export interface IHttpResponse extends FastifyReply {}
export interface IHttpRoute extends RouteOptions {}

export interface IHttpServer {
  registerRoutes: (routes: IHttpRoute[]) => void;
  start: () => Promise<void>;
}
