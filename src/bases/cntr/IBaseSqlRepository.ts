export interface IBaseSqlRepository {
  tag: string;
  query<T>(sql: string, values: unknown[]): Promise<T[]>;
  getById<T>(id: string, fields?: string[]): Promise<T[]>;
  create<T>({...record}: {[x: string]: unknown}): Promise<T[]>;
  update<T>(id: string, {...record}: {[x: string]: unknown}): Promise<T[]>;
  delete<T>(id: string): Promise<T[]>;
}
