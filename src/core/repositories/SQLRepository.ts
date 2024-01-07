import {ISQLDatabase} from '../databases/ISQLDatabase';
import {ISQLRepository} from './ISQLRepository';

interface ISQLRepositoryConstructor {
  db: ISQLDatabase;
  table: string;
}

export default class SQLRepository implements ISQLRepository {
  public db: ISQLDatabase;
  private table: string;

  constructor({db, table}: ISQLRepositoryConstructor) {
    this.db = db;
    this.table = table;
  }

  public async query<T>(sql: string, values: unknown[]): Promise<T[]> {
    return this.db.query(sql, values);
  }

  public async getById<T>(id: string, fields = ['*']): Promise<T[]> {
    const columns = fields.join(', ');
    return this.query(`SELECT ${columns} FROM ${this.table} WHERE id = $1;`, [id]);
  }

  public async create<T>({...record}): Promise<T[]> {
    const keys = Object.keys(record);

    const nums = new Array(keys.length);
    const data = new Array(keys.length);

    let i = 0;

    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }

    const columns = '"' + keys.join('", "') + '"';
    const values = nums.join(', ');

    return this.query(`INSERT INTO "${this.table}" (${columns}) VALUES (${values});`, data);
  }

  public async update<T>(id: string, {...record}): Promise<T[]> {
    const keys = Object.keys(record);
    const updates = new Array(keys.length);
    const data = new Array(keys.length);

    let i = 0;

    for (const key of keys) {
      data[i] = record[key];
      updates[i] = `${key} = $${++i}`;
    }

    const delta = updates.join(', ');
    const sql = `UPDATE ${this.table} SET ${delta} WHERE id = $${++i};`;

    data.push(id);
    return this.query(sql, data);
  }

  public async delete<T>(id: string): Promise<T[]> {
    return this.query(`DELETE FROM ${this.table} WHERE id = $1;`, [id]);
  }
}
