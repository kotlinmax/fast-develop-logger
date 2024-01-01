import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordRepository {
  tag: string;
  getById(id: string): Promise<ILogRecordEntity[]>;
  create(logRecord: ILogRecordEntity): Promise<{id: string}>;
  createBatch(logRecords: ILogRecordEntity[]): Promise<{id: string}[]>;
}
