import {IBaseQueueService} from '../../../../bases/cntr/services/IBaseQueueService';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {TCallback, TWsSubscribeCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordEntity} from '../ILogRecordEntity';

export interface ILogRecordQueueService extends IBaseQueueService {
  env: IEnv;
  listenDatabase: TWsSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
