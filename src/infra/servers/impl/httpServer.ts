import Environment from '../../env/Environment';
import fastify, {FastifyInstance} from 'fastify';
import {IHttpServer, IHttpRoute} from '../cnrt/IHttpServer';
import {ILoggerFastify} from '../../logger/ILogger';
import {IBaseHttpRouter} from '../../../bases/cntr/routes/IBaseHttpRouter';

const env = Environment.getEnv();

export default class HttpServer implements IHttpServer {
  public app: FastifyInstance;

  routes: IHttpRoute[] = [];

  constructor(private logger: ILoggerFastify) {
    this.app = fastify({logger: logger.getLogger()});
  }

  public registerRoutes(router: IBaseHttpRouter) {
    this.routes.push(...router.routes);
  }

  public async start() {
    this.routes.forEach((route: IHttpRoute) => {
      this.app.route(route);
      this.logger.info(`[http] Start route: ${route.method} '${route.url}'`);
    });

    this.app.listen({port: Number(env.HTTP_SERVER_PORT)});
  }
}
