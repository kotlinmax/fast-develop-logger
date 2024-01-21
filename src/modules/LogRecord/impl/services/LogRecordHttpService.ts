import BaseHttpService from '../../../../bases/impl/services/BaseHttpService';

import {IEnv} from '../../../../infra/env/IEnvironment';
import {ILogger} from '../../../../infra/logger/ILogger';
import {ILogRecordEntity} from '../../cntr/ILogRecordEntity';
import {ILogRecordHttpService} from '../../cntr/services/ILogRecordHttpService';
import {ILogRecordSqlRepository} from '../../cntr/ILogRecordSqlRepository';
import {IEmitter} from '../../../../infra/emitter/IEmitter';
import {TControllerInfrastructure} from '../../../../infra';
import {TCallback} from '../../../../infra/servers/cnrt/IWsktServer';

interface IConstructor extends TControllerInfrastructure {
  logRecordRepository: ILogRecordSqlRepository;
}

export default class LogRecordHttpService extends BaseHttpService implements ILogRecordHttpService {
  readonly tag: string = 'LogRecordHttpService';

  private repository: ILogRecordSqlRepository;
  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;

  constructor(opts: IConstructor) {
    super();

    this.env = opts.env;
    this.emitter = opts.emitter;
    this.logger = opts.logger;
    this.repository = opts.logRecordRepository;
  }

  public listenDatabase(channel: string, callback: TCallback) {
    return this.repository.listen(channel, callback);
  }

  public async listenQueue(callback: TCallback) {
    // this.consumer.setCallback(callback);
  }

  public async getLogRecordById(id: string): Promise<ILogRecordEntity[]> {
    return this.repository.getById(id);
  }

  public async createLogRecord(row: ILogRecordEntity): Promise<{id: string}> {
    throw new Error('Method not implemented.');
  }

  public async createBatchLogRecords(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    return this.repository.createBatch(rows);
  }
}
