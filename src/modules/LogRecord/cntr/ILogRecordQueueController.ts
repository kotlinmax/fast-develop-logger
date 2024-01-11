import {IBaseQueueController} from '../../../bases/cntr/IBaseQueueController';
import {IHttpRequest, IHttpResponse} from '../../../infra/servers/cnrt/IHttpServer';

type LogRecordFunction<T> = (req: IHttpRequest, res: IHttpResponse) => Promise<T>;

export interface ILogRecordQueueController extends IBaseQueueController {
  getLogRecord: LogRecordFunction<void>;
  createLogRecord: LogRecordFunction<void>;
  handleWebSocketMessage: () => Promise<void>;
}
