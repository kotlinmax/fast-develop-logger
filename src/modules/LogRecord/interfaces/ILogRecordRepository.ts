import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordRepository {
  tag: string;
  getById(id: string): Promise<ILogRecordEntity[]>;
  createBatch(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
