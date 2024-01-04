import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordRepository {
  tag: string;
  getById(id: string): Promise<ILogRecordEntity[]>;
  createBatch(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
  subscribeDatabaseNotification(channel: string, callback: (msg: any) => void): Promise<() => Promise<void>>;
}
