import BaseQueueController from '../../../../bases/impl/controllers/BaseQueueController';

import {IHttpRequest, IHttpResponse} from '../../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordQueueController} from '../../cntr/controllers/ILogRecordQueueController';
import {ILogRecordQueueService} from '../../cntr/services/ILogRecordQueueService';

export default class LogRecordQueueController extends BaseQueueController implements ILogRecordQueueController {
  readonly tag: string = 'LogRecordQueueController';

  constructor(private service: ILogRecordQueueService) {
    super();
  }

  public async getLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }

  public async createLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }

  public async handleWebSocketMessage(): Promise<void> {}
}
