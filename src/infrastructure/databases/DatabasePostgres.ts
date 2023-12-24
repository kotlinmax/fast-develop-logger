import {Pool} from 'pg';

interface IPostgresConfig {
  user: string;
  host: string;
  password: string;
  port: number;
  max: number;
}

export default class DatabasePostgres {
  protected pool: Pool;

  constructor(config: IPostgresConfig) {
    this.pool = new Pool(config);
  }
}
