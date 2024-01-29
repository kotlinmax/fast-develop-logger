import {IBaseQueueController} from '../../../../bases/cntr/controllers/IBaseQueueController';
import {IHttpRequest, IHttpResponse} from '../../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordEntity} from '../ILogRecordEntity';

type LogRecordFunction<T> = (req: IHttpRequest, res: IHttpResponse) => Promise<T>;

export interface ILogRecordQueueController extends IBaseQueueController {
  getLogRecord: LogRecordFunction<void>;
  createLogRecord: (raw: ILogRecordEntity) => Promise<void>;
  handleWebSocketMessage: () => Promise<void>;
}
