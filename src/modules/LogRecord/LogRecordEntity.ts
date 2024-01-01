import {ILogRecordEntity} from './interfaces/ILogRecordEntity';

export default class LogRecordEntity implements ILogRecordEntity {
  id: string;
  ipCustomer: string;
  timestamp: Date;
  level: string;
  message: string;
  data: Record<string, unknown>;
  extraData: Record<string, unknown>;
  handler: string;
  from: string;

  constructor(params: ILogRecordEntity) {
    this.id = params.id;
    this.ipCustomer = params.ipCustomer;
    this.timestamp = params.timestamp;
    this.level = params.level;
    this.message = params.message;
    this.data = params.data;
    this.extraData = params.extraData;
    this.handler = params.handler;
    this.from = params.from;
  }
}
