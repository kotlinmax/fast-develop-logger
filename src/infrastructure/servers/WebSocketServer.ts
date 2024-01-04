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

  private clientSubscriptions: Map<any, boolean> = new Map();

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

      const domain = req.url;

      if (!domain) {
        ws.close();
        return;
      }

      const handlers = this.routes[domain];

      if (!handlers) {
        ws.close();
        return;
      }

      ws.on('message', async (message) => {
        this.logger.debug('Some send message');

        const msg = JSON.parse(message.toString());
        const action = msg.action;

        if (!action) {
          ws.send('You must send object same {action: someAction}');
          return;
        }

        const handler = handlers[action];

        if (!handler) {
          ws.send(`Action not found on route: ${domain}`);
          return;
        }

        if (action === 'subscribeDatabaseNotification') {
          if (this.clientSubscriptions.has(ws)) {
            ws.send(`Already has subscription of channel (${domain})`);
            return;
          }

          const topic = domain.replace('/', '');
          // this.logger.debug(`TOPIC: ${topic}`);
          console.log('TOPIC', topic);

          const unsubscribe = await handler(topic, (data) => {
            // this.logger.debug(data, 'MSG');
            console.log('data: ', data);

            ws.send(JSON.stringify(data));
          });

          this.clientSubscriptions.set(ws, true);

          const removeSubscription = () => {
            this.logger.warn('removeSubscription');
            unsubscribe();
            this.clientSubscriptions.delete(ws);
          };

          ws.on('close', removeSubscription);
          ws.on('error', removeSubscription);
        }
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
