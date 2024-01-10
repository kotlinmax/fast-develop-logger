import BaseHttpController from '../../../bases/impl/BaseHttpController';

import {IHttpRequest, IHttpResponse} from '../../../infra/servers/cnrt/IHttpServer';
import {ILogRecordHttpController} from '../cntr/ILogRecordHttpController';
import {ILogRecordService} from '../cntr/ILogRecordService';

export default class LogRecordHttpController extends BaseHttpController implements ILogRecordHttpController {
  readonly tag: string = 'LogRecordHttpController';

  constructor(private logRecordService: ILogRecordService) {
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
