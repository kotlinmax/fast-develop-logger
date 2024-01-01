export interface ILogRecordEntity {
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
