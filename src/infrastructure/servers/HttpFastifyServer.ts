import fastify, {FastifyInstance} from 'fastify';
import {IHttpServer, IHttpRoute} from './IHttpServer';
import {ILoggerFastify} from '../loggers/ILogger';
import {IProcessEnv} from '../env/IEnvironment';

const env = process.env as IProcessEnv;
export default class HttpFastifyServer implements IHttpServer {
  private app: FastifyInstance;

  constructor(private logger: ILoggerFastify) {
    this.app = fastify({logger: logger.getLogger()});
  }

  public registerRoutes(routes: IHttpRoute[]) {
    routes.forEach((route: IHttpRoute) => {
      this.app.route(route);
      this.logger.info(`[HttpServer] Start route: ${route.method} '${route.url}'`);
    });
  }

  public async start() {
    this.app.listen({port: Number(env.HTTP_SERVER_PORT)});
  }
}
