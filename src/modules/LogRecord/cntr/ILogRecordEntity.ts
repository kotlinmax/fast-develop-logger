import {IBaseEntity} from '../../../bases/cntr/IBaseEntity';

export interface ILogRecordEntity extends IBaseEntity {
  id: string;
  ipCustomer: string;
  timestamp: Date;
  level: string;
  message: string;
  data: Record<string, unknown>;
  extraData: Record<string, unknown>;
  handler: string;
  from: string;
}
