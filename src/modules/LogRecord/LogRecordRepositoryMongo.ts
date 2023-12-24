import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';

export default class LogRecordRepositoryMongo implements ILogRecordRepository {
  constructor() {}

  get tag() {
    return 'LogRecordRepositoryMongo';
  }

  getById(id: string): Promise<ILogRecordEntity[]> {
    throw new Error('Method not implemented.');
  }

  get(id: string): Promise<ILogRecordEntity> {
    throw new Error('Method not implemented.');
  }

  async create(logRecord: ILogRecordEntity): Promise<{id: string}> {
    return {id: 'testId'};
  }
}
