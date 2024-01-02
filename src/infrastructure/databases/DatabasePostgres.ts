import {Pool, PoolClient, PoolConfig} from 'pg';
import {ITransactionDB, IDatabaseSQL} from './IDatabase';

export default class DatabasePostgres implements IDatabaseSQL<PoolClient> {
  private pool: Pool;
  public escapeLiteral: (str: string) => string;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
    this.escapeLiteral = require('pg').escapeLiteral;
  }

  async query<T>(sql: string, values: unknown[] = []): Promise<T[]> {
    const res = await this.pool.query(sql, values);
    return res.rows;
  }

  async transaction(): Promise<ITransactionDB> {
    const connect = await this.pool.connect();

    const begin = () => connect.query('BEGIN');
    const commit = () => connect.query('COMMIT');
    const rollback = () => connect.query('ROLLBACK');
    const release = () => connect.release();

    const query = async <T>(sql: string, values?: unknown[]): Promise<T[]> => {
      const res = await connect.query(sql, values);
      return res.rows;
    };

    return {begin, commit, rollback, release, query};
  }
}
