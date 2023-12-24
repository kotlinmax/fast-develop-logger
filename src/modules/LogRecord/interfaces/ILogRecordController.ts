import {IHttpRequest, IHttpResponse} from '../../../infrastructure/servers/IHttpServer';

type LogRecordFunction<T> = (req: IHttpRequest, res: IHttpResponse) => Promise<T>;

export interface ILogRecordController {
  tag: string;
  getLogRecord: LogRecordFunction<void>;
  createLogRecord: LogRecordFunction<void>;
}
