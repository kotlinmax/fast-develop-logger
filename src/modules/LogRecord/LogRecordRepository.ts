import {IDatabaseSQL} from '../../infrastructure/databases/IDatabase';
import {IProcessEnv} from '../../infrastructure/env/IEnvironment';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';

interface ILogRecordRepositoryPostgresConstructor {
  env: IProcessEnv;
  db: IDatabaseSQL;
}

export default class LogRecordRepository implements ILogRecordRepository {
  private env: IProcessEnv;
  private db: IDatabaseSQL;

  constructor({db, env}: ILogRecordRepositoryPostgresConstructor) {
    this.env = env;
    this.db = db;
  }

  public get tag() {
    return 'LogRecordRepository';
  }

  async getById(id: string): Promise<ILogRecordEntity[]> {
    const query = `SELECT * FROM "LogRecords" WHERE "id" = $1;`;
    const items = await this.db.query<ILogRecordEntity>(query, [id]);
    return items;
  }

  async createBatch(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    if (rows.length > Number(this.env.LOG_RECORD_BATCH_SIZE)) {
      throw new Error(` -> [${this.tag}] createBatch: Batch of log records for insert to database must be 100 or less`);
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

    const ids = await this.db.query<{id: string}>(query);

    return ids;
  }
}
