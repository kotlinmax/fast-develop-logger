import {AddressInfo, WebSocketServer as WSS} from 'ws';
import {IWsRoutes, IWsktServer} from '../cnrt/IWsktServer';
import {ILoggerFastify} from '../../logger/ILogger';
import {IHttpServer} from '../cnrt/IHttpServer';
import {IBaseWsktRouter} from '../../../bases/cntr/routes/IBaseWsktRouter';

interface IWsServerConstructor {
  logger: ILoggerFastify;
  httpServer: IHttpServer;
}

export default class WebSocketServer implements IWsktServer {
  private wss: WSS;
  private routes: IWsRoutes = {};
  private logger: ILoggerFastify;
  private clientQueueListeners: Map<any, boolean> = new Map();

  constructor({httpServer, logger}: IWsServerConstructor) {
    this.logger = logger;
    this.wss = new WSS({server: httpServer.app.server});
  }

  public registerRoutes(router: IBaseWsktRouter) {
    this.routes = {...this.routes, ...router.routes};
    this.logger.info(`[wss] routes registered`);
  }

  public async start() {
    this.wss.on('listening', () => {
      const addressInfo = this.wss?.address() as AddressInfo;
      this.logger.info(`[wss] web socket server is start on ${addressInfo?.address}:${addressInfo.port}`);
    });

    this.wss.on('connection', async (ws, req) => {
      this.logger.debug('[wss] some connected to web socket server');

      const domain = req.url?.replace('/', '');

      if (!domain) {
        ws.close();
        return;
      }

      const route = this.routes[domain];

      if (!route) {
        ws.close();
        return;
      }

      ws.on('message', async (message) => {
        this.logger.debug('[wss] some send message');

        const msg = JSON.parse(message.toString());
        const handler = route.actions[msg.action];

        if (!handler) {
          ws.send(`Invalid action or channel`);
          return;
        }

        handler(msg);
      });

      ws.on('close', () => {
        this.logger.info(`[wss]: ws success finished.`);
      });

      ws.on('error', (err) => {
        this.logger.error(`[wss]: ws has error: ${err}`);
      });
    });
  }
}
