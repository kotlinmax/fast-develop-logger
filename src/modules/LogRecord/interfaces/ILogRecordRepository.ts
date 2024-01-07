import {IRepositorySQL} from '../../../core/repository/IRepositorySQL';
import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordRepository extends IRepositorySQL {
  tag: string;
  createBatch(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
  subscribeDatabaseNotification(channel: string, callback: (msg: any) => void): Promise<() => Promise<void>>;
}
