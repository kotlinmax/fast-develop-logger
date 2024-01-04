import {IHttpRequest, IHttpResponse} from '../../../infrastructure/servers/interfaces/IHttpServer';

type LogRecordFunction<T> = (req: IHttpRequest, res: IHttpResponse) => Promise<T>;

export interface ILogRecordHttpController {
  tag: string;
  getLogRecord: LogRecordFunction<void>;
  createLogRecord: LogRecordFunction<void>;
  handleWebSocketMessage: () => Promise<void>;
}
export interface ILogRecordWebSocketController {
  tag: string;
  getSingleLogRecordFromStream: () => Promise<void>;
}
