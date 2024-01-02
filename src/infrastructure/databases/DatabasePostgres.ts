import {Pool, PoolClient, PoolConfig} from 'pg';
import {IDatabaseSQL} from './IDatabase';

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

  async beginTransaction(): Promise<PoolClient> {
    const client = await this.pool.connect();
    await client.query('BEGIN');
    return client;
  }

  async commit(client: PoolClient): Promise<void> {
    await client.query('COMMIT');
    client.release();
  }

  async rollback(client: PoolClient): Promise<void> {
    await client.query('ROLLBACK');
    client.release();
  }
}
