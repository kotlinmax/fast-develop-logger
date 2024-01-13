import BaseSqlRepository from '../../../bases/impl/BaseSqlRepository';

import {IDatabaseSQL} from '../../../infra/db/IDatabaseSQL';
import {IEnv} from '../../../infra/env/IEnvironment';
import {ILogRecordEntity} from '../cntr/ILogRecordEntity';
import {ILogRecordSqlRepository} from '../cntr/ILogRecordSqlRepository';

interface IConstructor {
  env: IEnv;
  db: IDatabaseSQL;
}

export default class LogRecordSqlRepository extends BaseSqlRepository implements ILogRecordSqlRepository {
  readonly tag: string = 'LogRecordSqlRepository';
  readonly table: string = 'LogRecords';

  private env: IEnv;

  constructor({db, env}: IConstructor) {
    super(db);
    this.env = env;
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
