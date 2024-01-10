import BaseEntity from '../../../bases/impl/BaseEntity';
import {ILogRecordEntity} from '../cntr/ILogRecordEntity';

export default class LogRecordEntity extends BaseEntity implements ILogRecordEntity {
  readonly tag: string = 'LogRecordEntity';

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
    super();
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
