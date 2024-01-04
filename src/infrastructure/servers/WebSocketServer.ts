import {AddressInfo, WebSocketServer as WSS} from 'ws';
import {IWebSocketRoutes, IWebSocketServer} from './interfaces/IWebSocketServer';
import {ILoggerFastify} from '../loggers/ILogger';
import {IHttpServer} from './interfaces/IHttpServer';

interface IWebSocketServerConstructor {
  logger: ILoggerFastify;
  httpServer: IHttpServer;
}

export default class WebSocketServer implements IWebSocketServer {
  private wss: WSS;
  private routes: IWebSocketRoutes;

  private logger: ILoggerFastify;

  constructor({httpServer, logger}: IWebSocketServerConstructor) {
    this.logger = logger;
    this.wss = new WSS({server: httpServer.app.server});
  }

  public registerRoutes(routes: IWebSocketRoutes) {
    this.routes = routes;
    this.logger.info(`[wss] routes registered`);
  }

  public async start() {
    this.wss.on('listening', () => {
      const addressInfo = this.wss?.address() as AddressInfo;
      this.logger.info(`[wss] web socket server is start on ${addressInfo?.address}:${addressInfo.port}`);
    });

    this.wss.on('connection', async (ws, req) => {
      this.logger.debug('Some connected to web socket server');

      if (!req.url) {
        ws.close();
        return;
      }

      const handlers = this.routes[req.url];

      if (!handlers) {
        ws.close();
        return;
      }

      const subscribeDatabaseNotification = handlers.subscribeDatabaseNotification;

      if (subscribeDatabaseNotification) {
        const unsubscribe = await subscribeDatabaseNotification(req.url, (data) => {
          ws.send(JSON.stringify(data));
        });

        ws.on('close', unsubscribe);
        ws.on('error', unsubscribe);
      }

      ws.on('message', async (message) => {
        this.logger.debug('Some send message');
      });

      ws.on('close', () => {
        this.logger.error(`[WebsocketServer]: closed`);
      });

      ws.on('error', (err) => {
        this.logger.error(`[WebsocketServer]: error: ${err}`);
      });
    });
  }
}
