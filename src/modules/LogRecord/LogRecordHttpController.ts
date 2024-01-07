// src/controllers/LogRecordController.ts

import {IHttpRequest, IHttpResponse} from '../../core/servers/interfaces/IHttpServer';
import {ILogRecordHttpController} from './interfaces/ILogRecordController';
import {ILogRecordService} from './interfaces/ILogRecordService';

export default class LogRecordHttpController implements ILogRecordHttpController {
  constructor(private logRecordService: ILogRecordService) {}

  public get tag() {
    return 'LogRecordController';
  }

  public async getLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }

  public async createLogRecord(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }
  public async handleWebSocketMessage(): Promise<void> {}
}
