import {Pool, PoolConfig} from 'pg';
import {ITransactionDB, IDatabaseSQL} from './IDatabase';
import {TWebSocketCallback, TWebSocketUnsubscribe} from '../servers/interfaces/IWebSocketServer';

export default class DatabasePostgres implements IDatabaseSQL {
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

  async subscribeDatabaseNotification(channel: string, callback: TWebSocketCallback): TWebSocketUnsubscribe {
    const connection = await this.pool.connect();

    connection.on('notification', callback);
    await connection.query(`LISTEN ${channel}`);

    const unsubscribe = async () => {
      await connection.query(`UNLISTEN ${channel}`);
      connection.removeAllListeners('notification');
      connection.release();
    };

    return unsubscribe;
  }
}
