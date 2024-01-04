export interface IDatabaseSQL {
  escapeLiteral: (str: string) => string;
  query<T>(sql: string, values?: unknown[]): Promise<T[]>;
  transaction(): Promise<ITransactionDB>;
  subscribeDatabaseNotification(channel: string, callback: (msg: any) => void): Promise<() => Promise<void>>;
}

export interface ITransactionDB {
  begin: () => Promise<unknown>;
  commit: () => Promise<unknown>;
  rollback: () => Promise<unknown>;
  query: <T>(sql: string, values?: unknown[]) => Promise<T[]>;
  release: () => void;
}
