import {IBaseWsktService} from '../../../../bases/cntr/services/IBaseWsktService';
import {TCallback, TWsktSubscribeCallback} from '../../../../infra/servers/cnrt/IWsktServer';
import {ILogRecordEntity} from '../ILogRecordEntity';

export interface ILogRecordWsktService extends IBaseWsktService {
  listenDatabase: TWsktSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
