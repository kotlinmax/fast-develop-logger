import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';
import {ILogRecordService} from './interfaces/ILogRecordService';

export default class LogRecordService implements ILogRecordService {
  constructor(private logRecordRepository: ILogRecordRepository) {}

  public get tag() {
    return 'LogRecordService';
  }

  getLogRecordById(id: string): Promise<ILogRecordEntity[]> {
    return this.logRecordRepository.getById(id);
  }

  createLogRecord(logRecord: ILogRecordEntity): Promise<{id: string}> {
    throw new Error('Method not implemented.');
  }
}
