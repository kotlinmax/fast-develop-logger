import {IBaseWsService} from '../../../../bases/cntr/services/IBaseWsService';
import {TCallback, TWsSubscribeCallback} from '../../../../infra/servers/cnrt/IWsServer';
import {ILogRecordEntity} from '../ILogRecordEntity';

export interface ILogRecordWsService extends IBaseWsService {
  listenDatabase: TWsSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
