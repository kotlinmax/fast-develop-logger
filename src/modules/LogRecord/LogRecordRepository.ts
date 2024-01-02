import {type PoolClient} from 'pg';
import {IDatabaseSQL} from '../../infrastructure/databases/IDatabase';
import {IProcessEnv} from '../../infrastructure/env/IEnvironment';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';

interface ILogRecordRepositoryPostgresConstructor {
  env: IProcessEnv;
  db: IDatabaseSQL<PoolClient>;
}

export default class LogRecordRepository implements ILogRecordRepository {
  private env: IProcessEnv;
  private db: IDatabaseSQL<PoolClient>;

  constructor({db, env}: ILogRecordRepositoryPostgresConstructor) {
    this.env = env;
    this.db = db;
  }

  public get tag() {
    return 'LogRecordRepositoryPostgres';
  }

  async getById(id: string): Promise<ILogRecordEntity[]> {
    const query = `SELECT * FROM "LogRecord" WHERE "id" = $1;`;
    const items = await this.db.query<ILogRecordEntity>(query, [id]);
    return items;
  }

  async create(logRecord: ILogRecordEntity): Promise<{id: string}> {
    const trx = await this.db.transaction();

    await trx.begin();
    await trx.query('SELECT 1;');
    await trx.query('SELECT 2;');
    await trx.commit();

    trx.release();

    return {id: 'testId'};
  }

  async createBatch(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    if (rows.length > Number(this.env.BATCH_SIZE_LOG_RECORD)) {
      throw new Error(`[${this.tag}] Batch of log records for insert to database must be 100 or less`);
    }

    const esc = this.db.escapeLiteral;
    const str = JSON.stringify;

    const arr = rows.map((row: ILogRecordEntity) => {
      return `
        (
          ${esc(row.id)}                  ,
          ${esc(row.timestamp.toString())},
          ${esc(row.ipCustomer)}          ,
          ${esc(row.level)}               ,
          ${esc(row.message)}             ,
          ${esc(row.handler)}             ,
          ${esc(row.from)}                ,
          ${esc(str(row.data))}           ,
          ${esc(str(row.extraData))}
        )
      `;
    });

    const values: string = `VALUES ${arr.join(',')} RETURNING "id"`;

    const query: string = `
      INSERT INTO "LogRecord" (
        "id"          ,
        "timestamp"   ,
        "ipCustomer"  ,
        "level"       ,
        "message"     ,
        "handler"     ,
        "from"        ,
        "data"        ,
        "extraData"
      )
      ${values};
    `;

    const items = await this.db.query<{id: string}>(query);

    return items;
  }
}
