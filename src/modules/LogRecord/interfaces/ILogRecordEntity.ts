// src/interfaces/models/ILogRecord.ts

export interface ILogRecordEntity {
  id: string;
  ip: string;
  timestamp: Date;
  level: string;
  message: string;
  request: Record<string, unknown>;
  response: Record<string, unknown>;
  handler: string;
  from: string;
}
