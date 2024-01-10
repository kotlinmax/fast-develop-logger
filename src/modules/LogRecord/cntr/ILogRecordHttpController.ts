import {IBaseHttpController} from '../../../bases/cntr/IBaseHttpController';
import {IHttpRequest, IHttpResponse} from '../../../infra/servers/cnrt/IHttpServer';

type LogRecordFunction<T> = (req: IHttpRequest, res: IHttpResponse) => Promise<T>;

export interface ILogRecordHttpController extends IBaseHttpController {
  getLogRecord: LogRecordFunction<void>;
  createLogRecord: LogRecordFunction<void>;
  handleWebSocketMessage: () => Promise<void>;
}
