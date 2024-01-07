import SQLRepository from '../../core/repositories/SQLRepository';

import {ISQLDatabase} from '../../core/databases/ISQLDatabase';
import {IProcessEnv} from '../../core/env/IEnvironment';
import {TCallback} from '../../core/servers/interfaces/IWebSocketServer';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';

interface ILogRecordRepositoryPostgresConstructor {
  env: IProcessEnv;
  db: ISQLDatabase;
}

export default class LogRecordRepository extends SQLRepository implements ILogRecordRepository {
  private env: IProcessEnv;

  constructor({db, env}: ILogRecordRepositoryPostgresConstructor) {
    super({table: 'LogRecords', db});
    this.env = env;
  }

  public get tag() {
    return 'LogRecordRepository';
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
      INSERT INTO "LogRecords" (
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
