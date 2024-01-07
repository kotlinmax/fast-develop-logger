import {Pool, PoolConfig} from 'pg';
import {IDatabaseTransaction, ISQLDatabase} from './ISQLDatabase';
import {TWebSocketCallback, TWebSocketUnsubscribe} from '../servers/interfaces/IWebSocketServer';

export default class SQLDatabasePostgres implements ISQLDatabase {
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

  async subscribeDatabaseNotification(channel: string, callback: TWebSocketCallback): TWebSocketUnsubscribe {
    const connection = await this.pool.connect();
    await connection.query(`LISTEN "${channel}";`);

    connection.on('notification', callback);

    const unsubscribe = async () => {
      await connection.query(`UNLISTEN "${channel}";`);
      connection.removeAllListeners('notification');
      connection.release();
    };

    return unsubscribe;
  }
}
