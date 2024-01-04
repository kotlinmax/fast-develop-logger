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
    console.log('DatabasePostgres channel', channel);

    await connection.query(`LISTEN log_record;`);
    const res = await this.pool.query(`SELECT COUNT(*) FROM "LogRecords";`);
    console.log(res.rows);

    connection.on('notice', (msg) => {
      console.log('notice');
      callback(msg);
    });
    connection.on('notification', (msg) => {
      console.log('notification');
      callback(msg);
    });

    connection.query(`NOTIFY log_record, 'bartet!'`);

    const unsubscribe = async () => {
      await connection.query(`UNLISTEN log_record;`);
      connection.removeAllListeners('notification');
      connection.release();
    };
    return unsubscribe;
  }
}
