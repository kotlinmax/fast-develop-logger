import {ILogRecordEntity} from './ILogRecordEntity';

export interface ILogRecordService {
  tag: string;
  getLogRecordById(id: string): Promise<ILogRecordEntity[]>;
  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}>;
}
