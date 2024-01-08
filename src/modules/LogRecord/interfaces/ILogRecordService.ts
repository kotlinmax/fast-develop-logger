import {TCallback, TWebSocketSubscribeCallback} from '../../../core/servers/interfaces/IWebSocketServer';
import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordService {
  tag: string;
  listenDatabase: TWebSocketSubscribeCallback;
  listenQueue: (callback: TCallback) => Promise<void>;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
