import {Pool, PoolConfig} from 'pg';
import {TCallback, TWsUnsubscribe} from '../servers/cnrt/IWsServer';
import {IDatabaseSQL, IDatabaseTransaction} from './IDatabaseSQL';

export default class DatabaseSQL implements IDatabaseSQL {
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

  async transaction(): Promise<IDatabaseTransaction> {
    const connection = await this.pool.connect();

    const begin = () => connection.query('BEGIN');
    const commit = () => connection.query('COMMIT');
    const rollback = () => connection.query('ROLLBACK');
    const release = () => connection.release();

    const query = async <T>(sql: string, values?: unknown[]): Promise<T[]> => {
      const res = await connection.query(sql, values);
      return res.rows;
    };

    return {begin, commit, rollback, release, query};
  }

  async listen(channel: string, callback: TCallback): TWsUnsubscribe {
    const connection = await this.pool.connect();
    await connection.query(`LISTEN "${channel}";`);

    connection.on('notification', callback);

    const unlisten = async () => {
      await connection.query(`UNLISTEN "${channel}";`);
      connection.removeAllListeners('notification');
      connection.release();
    };

    return unlisten;
  }
}
