import {IBaseQueueService} from '../../../bases/cntr/IBaseQueueService';
import {TCallback, TWsSubscribeCallback} from '../../../infra/servers/cnrt/IWsServer';
import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordQueueService extends IBaseQueueService {
  listenDatabase: TWsSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
