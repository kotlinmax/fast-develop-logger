import {IHttpRequest, IHttpResponse} from '../../../core/servers/interfaces/IHttpServer';
import {TWebSocketSubscribeCallback} from '../../../core/servers/interfaces/IWebSocketServer';

type LogRecordFunction<T> = (req: IHttpRequest, res: IHttpResponse) => Promise<T>;

export interface ILogRecordHttpController {
  tag: string;
  getLogRecord: LogRecordFunction<void>;
  createLogRecord: LogRecordFunction<void>;
  handleWebSocketMessage: () => Promise<void>;
}
export interface ILogRecordWebSocketController {
  tag: string;
  listenDatabase: TWebSocketSubscribeCallback;
}
