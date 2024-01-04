import Environment from '../env/Environment';
import fastify, {FastifyInstance} from 'fastify';
import {IHttpServer, IHttpRoute} from './interfaces/IHttpServer';
import {ILoggerFastify} from '../loggers/ILogger';

const env = Environment.getEnv();

export default class HttpServer implements IHttpServer {
  public app: FastifyInstance;

  constructor(private logger: ILoggerFastify) {
    this.app = fastify({logger: logger.getLogger()});
  }

  public registerRoutes(routes: IHttpRoute[]) {
    routes.forEach((route: IHttpRoute) => {
      this.app.route(route);
      this.logger.info(`[http] Start route: ${route.method} '${route.url}'`);
    });
  }

  public async start() {
    this.app.listen({port: Number(env.HTTP_SERVER_PORT)});
  }
}
