import {IBaseHttpService} from '../../../../bases/cntr/services/IBaseHttpService';
import {TCallback, TWsSubscribeCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordEntity} from '../ILogRecordEntity';

export interface ILogRecordHttpService extends IBaseHttpService {
  listenDatabase: TWsSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  // getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  // createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
