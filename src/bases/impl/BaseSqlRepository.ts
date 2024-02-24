import BaseClass from '..';
import {IDatabaseSQL} from '../../infra/db/IDatabaseSQL';
import {TCallback} from '../../infra/servers/cnrt/IWsktServer';
import {IBaseSqlRepository, QueryOptions, WhereCondition} from '../cntr/IBaseSqlRepository';

export default abstract class BaseSqlRepository extends BaseClass implements IBaseSqlRepository {
  abstract readonly table: string;

  constructor(readonly db: IDatabaseSQL) {
    super();
  }

  public async listen(channel: string, callback: TCallback) {
    return this.db.listen(channel, callback);
  }

  public async query<T>(sql: string, values: unknown[]): Promise<T[]> {
    return this.db.query(sql, values);
  }

  public async get<T>(fields: string[], opts?: QueryOptions): Promise<T[]> {
    const columns = fields.map((f) => (f === '*' ? `${f}` : `"${f}"`)).join(', ');

    let whereClause = '';
    let whereParams: unknown[] = [];

    if (opts?.where) {
      const [sqlWhere, params] = this.transformWhereToSQL(opts.where);
      whereClause = `WHERE ${sqlWhere}`;
      whereParams = params;
    }

    const sql = `SELECT ${columns} FROM "${this.table}" ${whereClause};`;
    const finalParams = [...whereParams];

    return this.query<T>(sql, finalParams);
  }

  public async update<T>(record: Record<string, any>, opts?: QueryOptions): Promise<T[]> {
    const keys = Object.keys(record);
    const updateParams = keys.map((key) => record[key]);
    const updateClauses = keys.map((key, index) => `"${key}" = $${index + 1}`);
    const delta = updateClauses.join(', ');

    let whereClause = '';
    let whereParams: unknown[] = [];

    if (opts?.where) {
      const [sqlWhere, params] = this.transformWhereToSQL(opts.where, updateParams.length + 1);
      whereClause = `WHERE ${sqlWhere}`;
      whereParams = params;
    }

    const sql = `UPDATE "${this.table}" SET ${delta} ${whereClause};`;
    const finalParams = [...updateParams, ...whereParams];

    return this.query<T>(sql, finalParams);
  }

  public async create<T>({...record}): Promise<T[]> {
    const keys = Object.keys(record);

    if (keys.length === 0) {
      const sql = `INSERT INTO "${this.table}" DEFAULT VALUES;`;
      return this.query(sql, []);
    }

    const data = keys.map((key) => record[key]);
    const clms = keys.map((key) => `"${key}"`).join(', ');
    const vals = keys.map((_, index) => `$${index + 1}`).join(', ');

    const sql = `INSERT INTO "${this.table}" (${clms}) VALUES (${vals});`;
    return this.query(sql, data);
  }

  public async createBatch<T>(records: Array<Record<string, any>>): Promise<T[]> {
    if (records.length === 0) {
      throw new Error('No records to insert');
    }

    const keys = Object.keys(records[0]);
    const clms = '"' + keys.join('", "') + '"';

    const vals = [];
    const rows = [];

    if (keys.length === 0) {
      const sql = `INSERT INTO "${this.table}" DEFAULT VALUES;`;
      return this.query(sql, []);
    }

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const rowData = [];

      for (const key of keys) rowData.push(record[key]);
      vals.push(...rowData);

      const nums = keys.map((_, index) => `$${i * keys.length + index + 1}`);
      rows.push(`(${nums.join(', ')})`);
    }

    const sql = `INSERT INTO "${this.table}" (${clms}) VALUES ${rows.join(', ')};`;
    return this.query(sql, vals);
  }

  public async delete<T>(opts?: QueryOptions): Promise<T[]> {
    let whereClause = '';
    let whereParams: unknown[] = [];

    if (opts?.where) {
      const [sqlWhere, params] = this.transformWhereToSQL(opts.where);
      whereClause = `WHERE ${sqlWhere}`;
      whereParams = params;
    }

    const sql = `DELETE FROM "${this.table}" ${whereClause};`;
    const finalParams = [...whereParams];

    return this.query<T>(sql, finalParams);
  }

  private transformWhereToSQL(where: WhereCondition, startIndex: number = 1): [string, unknown[]] {
    let params: any[] = [];
    let paramCounter = startIndex;

    function processCondition(condition: WhereCondition, operator: string): string {
      return Object.entries(condition)
        .map(([key, value]) => {
          if (key === 'AND' || key === 'OR') {
            return `(${value.map((subCondition: any) => processCondition(subCondition, key)).join(` ${key} `)})`;
          } else {
            return processSingleCondition(key, value);
          }
        })
        .join(` ${operator} `);
    }

    function processSingleCondition(key: string, value: any): string {
      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        return processAdvancedCondition(key, value);
      } else {
        return formatCondition(key, '=', value);
      }
    }

    function processAdvancedCondition(key: string, value: any): string {
      // Обработка массивов
      if (Array.isArray(value)) {
        params.push(value);
        return `"${key}" = ANY($${paramCounter++})`;
      }

      // Обработка объектов (например, диапазонов или JSON)
      if (value !== null && typeof value === 'object') {
        return processObjectCondition(key, value);
      }

      // Обработка простых условий
      return formatCondition(key, '=', value);
    }

    function processObjectCondition(key: string, value: {[op: string]: any}): string {
      return Object.entries(value)
        .map(([op, val]) => {
          let operator = op === '!=' ? '<>' : op;
          return formatCondition(key, operator, val);
        })
        .join(' AND ');
    }

    function formatCondition(key: string, operator: string, value: any): string {
      let placeholder = `$${paramCounter++}`;
      params.push(value);
      return `"${key}" ${operator} ${placeholder}`;
    }

    const whereClause = processCondition(where, 'AND');
    return [whereClause, params];
  }
}
