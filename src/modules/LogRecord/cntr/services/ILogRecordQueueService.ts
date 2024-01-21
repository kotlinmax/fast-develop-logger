import {IBaseQueueService} from '../../../../bases/cntr/services/IBaseQueueService';
import {IEnv} from '../../../../infra/env/IEnvironment';
import {TCallback, TWsktSubscribeCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {ILogRecordEntity} from '../ILogRecordEntity';

export interface ILogRecordQueueService extends IBaseQueueService {
  listenDatabase: TWsktSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
