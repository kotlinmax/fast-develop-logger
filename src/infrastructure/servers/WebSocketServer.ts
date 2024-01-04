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
    this.logger.info(`[wss] registered routes is success`);
  }

  public async start() {
    this.wss.on('listening', () => {
      const addressInfo = this.wss?.address() as AddressInfo;
      this.logger.info(`[wss] web socket server is start on ${addressInfo?.address}:${addressInfo.port}`);
    });

    this.wss.on('connection', (ws, req) => {
      this.logger.debug('Some connected');

      if (!req.url) {
        ws.close();
        return;
      }

      const handlerMap = this.routes[req.url];

      if (!handlerMap) {
        ws.close();
        return;
      }

      ws.on('message', async (message) => {
        this.logger.debug('Some send message');

        const msg = JSON.parse(message.toString()) as {action: string};
        const handler = handlerMap[msg.action];

        if (!handler) {
          ws.send('Unknown action');
          return;
        }

        const data = await handler();
        ws.send(JSON.stringify(data));
      });

      ws.on('error', (err) => {
        this.logger.error(`[WebsocketServer]: error: ${err}`);
      });
    });
  }
}
