import {QueryResult} from 'pg';

export interface IDatabaseSQL<Client> {
  escapeLiteral: (str: string) => string;
  query<T>(sql: string, values?: unknown[]): Promise<T[]>;
  transaction(): Promise<ITransactionDB>;
}

export interface ITransactionDB {
  begin: () => Promise<unknown>;
  commit: () => Promise<unknown>;
  rollback: () => Promise<unknown>;
  query: <T>(sql: string, values?: unknown[]) => Promise<T[]>;
  release: () => void;
}
