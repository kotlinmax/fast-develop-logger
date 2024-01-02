export interface IDatabaseSQL<Client> {
  escapeLiteral: (str: string) => string;
  query<T>(sql: string, values?: unknown[]): Promise<T[]>;
  beginTransaction(): Promise<Client>;
  commit(client: Client): Promise<void>;
  rollback(client: Client): Promise<void>;
}
