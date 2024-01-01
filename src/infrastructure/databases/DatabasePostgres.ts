import {Pool, ClientBase} from 'pg';
const {escapeLiteral} = require('pg');

interface IPostgresConfig {
  user: string;
  host: string;
  password: string;
  port: number;
  max: number;
}

export default class DatabasePostgres {
  protected pool: Pool;
  protected escapeLiteral: (str: string) => string;

  constructor(config: IPostgresConfig) {
    this.pool = new Pool(config);
    this.escapeLiteral = escapeLiteral;
  }
}
