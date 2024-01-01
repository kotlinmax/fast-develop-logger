import {QueryResult} from 'pg';
import DatabasePostgres from '../../infrastructure/databases/DatabasePostgres';

import {IProcessEnv} from '../../infrastructure/env/IEnvironment';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordRepository} from './interfaces/ILogRecordRepository';

interface ILogRecordRepositoryPostgresConstructor {
  env: IProcessEnv;
}

export default class LogRecordRepository extends DatabasePostgres implements ILogRecordRepository {
  private env: IProcessEnv;

  constructor({env}: ILogRecordRepositoryPostgresConstructor) {
    super({
      user: env.POSTGRES_USER,
      host: env.POSTGRES_SERVICE,
      password: env.POSTGRES_PASSWORD,
      port: Number(env.POSTGRES_PORT),
      max: Number(env.POSTGRES_MAX),
    });

    this.env = env;
  }

  public get tag() {
    return 'LogRecordRepositoryPostgres';
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
    if (rows.length > Number(this.env.BATCH_SIZE_LOG_RECORD)) {
      throw new Error(`[${this.tag}] Batch of log records for insert to database must be 100 or less`);
    }

    const esc = this.escapeLiteral;
    const str = JSON.stringify;

    const arr = rows.map((row: ILogRecordEntity) => {
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

    const res: QueryResult<{id: string}> = await this.pool.query(query);

    return res.rows;
  }
}
