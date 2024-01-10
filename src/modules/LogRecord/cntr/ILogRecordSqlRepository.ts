import {IBaseSqlRepository} from '../../../bases/cntr/IBaseSqlRepository';
import {ILogRecordEntity} from './ILogRecordEntity';

// TODO попробовать эти методы перенести в базовый
export interface ILogRecordSqlRepository extends IBaseSqlRepository {
  createBatch(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
  listen(channel: string, callback: (msg: any) => void): Promise<() => Promise<void>>;
}
