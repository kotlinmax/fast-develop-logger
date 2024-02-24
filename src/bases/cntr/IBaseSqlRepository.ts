import {IBaseClass} from '..';

export interface IBaseSqlRepository extends IBaseClass {
  listen(channel: string, callback: (msg: unknown) => void): Promise<() => Promise<void>>;
  query<T>(sql: string, values: unknown[]): Promise<T[]>;
  get<T>(fields?: string[], opts?: QueryOptions): Promise<T[]>;
  create<T>({...record}: {[x: string]: unknown}): Promise<T[]>;
  createBatch<T>([]: {[x: string]: unknown}[]): Promise<T[]>;
  update<T>({...record}: {[x: string]: unknown}, opts?: QueryOptions): Promise<T[]>;
  delete<T>(opts?: QueryOptions): Promise<T[]>;
}

export interface WhereCondition {
  [key: string]: any;
  AND?: WhereCondition[];
  OR?: WhereCondition[];
}

export interface QueryOptions {
  where: WhereCondition;
}
