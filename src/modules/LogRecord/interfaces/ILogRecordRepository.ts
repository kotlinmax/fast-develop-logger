import {ISQLRepository} from '../../../core/repositories/ISQLRepository';
import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordRepository extends ISQLRepository {
  tag: string;
  createBatch(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
  listen(channel: string, callback: (msg: any) => void): Promise<() => Promise<void>>;
}
