import DatabasePostgres from '../../infrastructure/databases/DatabasePostgres';
import Environment from '../../infrastructure/env/Environment';

import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';

const env = Environment.getEnv();

export default class LogRecordRepositoryPostgres extends DatabasePostgres implements ILogRecordRepository {
  public get tag() {
    return 'LogRecordRepositoryPostgres';
  }

  constructor() {
    super({
      user: env.POSTGRES_USER,
      host: env.POSTGRES_SERVICE,
      password: env.POSTGRES_PASSWORD,
      port: Number(env.POSTGRES_PORT),
      max: Number(env.POSTGRES_MAX),
    });
  }

  async getById(id: string): Promise<ILogRecordEntity[]> {
    const query = `SELECT * FROM "LogRecord" WHERE "id" = $1;`;
    const res = await this.pool.query<ILogRecordEntity>(query, [id]);

    return res.rows;
  }

  async create(logRecord: ILogRecordEntity): Promise<{id: string}> {
    return {id: 'testId'};
  }

  async createBatch(rows: ILogRecordEntity[]): Promise<{id: string}[]> {
    const esc = this.escapeLiteral;
    const str = JSON.stringify;

    const vls = rows.map((row: ILogRecordEntity) => {
      return `
        (
          ${esc(row.id)},
          ${esc(row.timestamp.toString())},
          ${esc(row.ipCustomer)},
          ${esc(row.level)},
          ${esc(row.message)},
          ${esc(row.handler)},
          ${esc(row.from)},
          ${esc(str(row.data))},
          ${esc(str(row.extraData))}
        )
      `;
    });

    const VALUES = `VALUES ${vls.join(',')} RETURNING "id"`;

    const query = `
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
      ${VALUES};
    `;

    const res = await this.pool.query<{id: string}>(query);

    return res.rows;
  }
}
