import {TWebSocketSubscribeCallback} from '../../../infrastructure/servers/interfaces/IWebSocketServer';
import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordService {
  tag: string;
  subscribeDatabaseNotification: TWebSocketSubscribeCallback;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatchLogRecords(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
