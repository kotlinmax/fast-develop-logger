import {AddressInfo, WebSocketServer as WSS} from 'ws';
import {IWsRoutes, IWsServer} from '../cnrt/IWsServer';
import {ILoggerFastify} from '../../logger/ILogger';
import {IHttpServer} from '../cnrt/IHttpServer';

interface IWsServerConstructor {
  logger: ILoggerFastify;
  httpServer: IHttpServer;
}

export default class WebSocketServer implements IWsServer {
  private wss: WSS;
  private routes: IWsRoutes;

  private logger: ILoggerFastify;

  private clientQueueListeners: Map<any, boolean> = new Map();

  constructor({httpServer, logger}: IWsServerConstructor) {
    this.logger = logger;
    this.wss = new WSS({server: httpServer.app.server});
  }

  public registerRoutes(routes: IWsRoutes) {
    this.routes = routes;
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
        const channel = route.channels[msg.channel];

        if (!handler || !channel) {
          ws.send(`Invalid action or channel`);
          return;
        }

        if (msg.action === 'listenQueue') {
          if (this.clientQueueListeners.has(ws)) {
            ws.send(`You already listen ${channel}`);
            return;
          }

          const unlisten = await handler(channel, (data: unknown) => {
            ws.send(JSON.stringify(data));
          });

          this.clientQueueListeners.set(ws, true);

          const removeSubscription = () => {
            unlisten();
            this.clientQueueListeners.delete(ws);
          };

          ws.on('close', removeSubscription);
          ws.on('error', removeSubscription);
        }
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
