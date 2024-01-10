export interface IDatabaseSQL {
  escapeLiteral: (str: string) => string;
  query<T>(sql: string, values?: unknown[]): Promise<T[]>;
  transaction(): Promise<IDatabaseTransaction>;
  listen(channel: string, callback: (msg: any) => void): Promise<() => Promise<void>>;
}

export interface IDatabaseTransaction {
  begin: () => Promise<unknown>;
  commit: () => Promise<unknown>;
  rollback: () => Promise<unknown>;
  query: <T>(sql: string, values?: unknown[]) => Promise<T[]>;
  release: () => void;
}
