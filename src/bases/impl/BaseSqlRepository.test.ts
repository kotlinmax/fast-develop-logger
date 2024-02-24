import BaseSqlRepository from './BaseSqlRepository';
import {IDatabaseSQL} from '../../infra/db/IDatabaseSQL';
import {IBaseSqlRepository} from '../cntr/IBaseSqlRepository';

// create repo for test
class UsersSqlRepository extends BaseSqlRepository implements IBaseSqlRepository {
  table: string = 'Users';
  tag: string = 'UsersSqlRepository';

  constructor(db: IDatabaseSQL) {
    super(db);
  }
}

const db = {
  query: jest.fn(),
  listen: jest.fn(),
  transaction: jest.fn(),
  escapeLiteral: jest.fn(),
};

const user = new UsersSqlRepository(db);

describe('BaseSqlRepository', () => {
  test('listen calls db.listen with correct arguments', async () => {
    const channel = 'test_channel';
    const callback = jest.fn();
    await user.listen(channel, callback);
    expect(db.listen).toHaveBeenCalledWith(channel, callback);
  });

  test('query calls db.query with correct arguments', async () => {
    const sql = 'SELECT * FROM "Users";';
    const vls: unknown[] = [];
    await user.query(sql, vls);
    expect(db.query).toHaveBeenCalledWith(sql, vls);
  });
});

describe('BaseSqlRepository get', () => {
  test('get generates correct SQL query with all fields and simple where', async () => {
    const id = '1';
    await user.get(['*'], {where: {id}});
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM "Users" WHERE "id" = $1;', [id]);
  });

  test('get generates correct SQL query with specific fields and simple where', async () => {
    const id = '1';
    await user.get(['name', 'age'], {where: {id}});
    expect(db.query).toHaveBeenCalledWith('SELECT "name", "age" FROM "Users" WHERE "id" = $1;', [id]);
  });

  test('get generates correct SQL query with all fields and no where condition', async () => {
    await user.get(['*']);
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM "Users" ;', []);
  });

  test('get generates correct SQL query with complex where condition', async () => {
    await user.get(['*'], {
      where: {
        AND: [{age: {'>': 30}}, {OR: [{name: 'Alice'}, {name: 'Bob'}]}],
      },
    });
    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM "Users" WHERE ("age" > $1 AND ("name" = $2 OR "name" = $3));',
      [30, 'Alice', 'Bob']
    );
  });
});

describe('BaseSqlRepository update', () => {
  test('update generates correct SQL query without where condition', async () => {
    const sql = 'UPDATE "Users" SET "name" = $1, "age" = $2 ;';
    await user.update({name: 'Alice', age: 25});
    expect(db.query).toHaveBeenCalledWith(sql, ['Alice', 25]);
  });

  test('update generates correct SQL query', async () => {
    const id = '1';
    const sql = 'UPDATE "Users" SET "name" = $1, "age" = $2 WHERE "id" = $3;';

    await user.update({name: 'Alice', age: 25}, {where: {id}});
    expect(db.query).toHaveBeenCalledWith(sql, ['Alice', 25, id]);
  });

  test('update generates correct SQL query with complex where condition', async () => {
    const sql = 'UPDATE "Users" SET "name" = $1, "age" = $2 WHERE ("status" = $3 AND ("role" = $4 OR "country" = $5));';
    await user.update(
      {name: 'Alice', age: 25},
      {
        where: {
          AND: [{status: 'active'}, {OR: [{role: 'admin'}, {country: 'USA'}]}],
        },
      }
    );
    expect(db.query).toHaveBeenCalledWith(sql, ['Alice', 25, 'active', 'admin', 'USA']);
  });

  test('update generates correct SQL query for single field', async () => {
    const id = '1';
    const sql = 'UPDATE "Users" SET "age" = $1 WHERE "id" = $2;';
    await user.update({age: 30}, {where: {id}});
    expect(db.query).toHaveBeenCalledWith(sql, [30, id]);
  });
});

describe('BaseSqlRepository create', () => {
  test('create generates correct SQL query', async () => {
    await user.create({name: 'Alice', age: 25});
    expect(db.query).toHaveBeenCalledWith('INSERT INTO "Users" ("name", "age") VALUES ($1, $2);', ['Alice', 25]);
  });

  test('create generates correct SQL query with one field', async () => {
    await user.create({name: 'Alice'});
    expect(db.query).toHaveBeenCalledWith('INSERT INTO "Users" ("name") VALUES ($1);', ['Alice']);
  });

  test('create generates correct SQL query with no fields', async () => {
    await user.create({});
    expect(db.query).toHaveBeenCalledWith('INSERT INTO "Users" DEFAULT VALUES;', []);
  });

  test('create handles special field names correctly', async () => {
    await user.create({emailAddress: 'alice@example.com', role: 'user'});
    expect(db.query).toHaveBeenCalledWith('INSERT INTO "Users" ("emailAddress", "role") VALUES ($1, $2);', [
      'alice@example.com',
      'user',
    ]);
  });

  test('create handles different data types correctly', async () => {
    const dateOfBirth = new Date('2000-01-01');
    await user.create({name: 'Alice', dateOfBirth: dateOfBirth});
    expect(db.query).toHaveBeenCalledWith('INSERT INTO "Users" ("name", "dateOfBirth") VALUES ($1, $2);', [
      'Alice',
      dateOfBirth,
    ]);
  });
});

describe('BaseSqlRepository delete', () => {
  test('delete generates correct SQL query', async () => {
    const id = '1';
    await user.delete({where: {id}});
    expect(db.query).toHaveBeenCalledWith('DELETE FROM "Users" WHERE "id" = $1;', [id]);
  });

  test('delete generates correct SQL query without where condition', async () => {
    await user.delete();
    expect(db.query).toHaveBeenCalledWith('DELETE FROM "Users" ;', []);
  });

  test('delete generates correct SQL query with complex where condition', async () => {
    await user.delete({
      where: {
        AND: [{status: 'active'}, {OR: [{role: 'admin'}, {country: 'USA'}]}],
      },
    });
    expect(db.query).toHaveBeenCalledWith(
      'DELETE FROM "Users" WHERE ("status" = $1 AND ("role" = $2 OR "country" = $3));',
      ['active', 'admin', 'USA']
    );
  });

  test('delete generates correct SQL query with array conditions', async () => {
    await user.delete({where: {id: ['1', '2', '3']}});
    expect(db.query).toHaveBeenCalledWith('DELETE FROM "Users" WHERE "id" = ANY($1);', [['1', '2', '3']]);
  });
});

describe('BaseSqlRepository create batch', () => {
  test('createBatch generates correct SQL query for multiple records', async () => {
    await user.createBatch([
      {name: 'John', age: 30},
      {name: 'Jane', age: 25},
    ]);
    const sql = `INSERT INTO "Users" ("name", "age") VALUES ($1, $2), ($3, $4);`;
    expect(db.query).toHaveBeenCalledWith(sql, ['John', 30, 'Jane', 25]);
  });

  // Дополнительные тесты для проверки ошибок или особых случаев
  test('createBatch throws an error with empty array', async () => {
    await expect(user.createBatch([])).rejects.toThrow('No records to insert');
  });

  test('createBatch generates correct SQL query for records with different number of fields', async () => {
    await user.createBatch([
      {name: 'John', age: 30, email: 'john@example.com'},
      {name: 'Jane', age: 25, email: 'jane@example.com'},
    ]);

    expect(db.query).toHaveBeenCalledWith(
      `INSERT INTO "Users" ("name", "age", "email") VALUES ($1, $2, $3), ($4, $5, $6);`,
      ['John', 30, 'john@example.com', 'Jane', 25, 'jane@example.com']
    );
  });

  test('createBatch generates correct SQL query for a single record', async () => {
    const sql = 'INSERT INTO "Users" ("name", "age") VALUES ($1, $2);';
    const john = {name: 'John', age: 30};
    await user.createBatch([john]);
    expect(db.query).toHaveBeenCalledWith(sql, ['John', 30]);
  });

  test('createBatch generates correct SQL query for records with no fields', async () => {
    const sql = 'INSERT INTO "Users" DEFAULT VALUES;';
    await user.createBatch([{}, {}]);
    expect(db.query).toHaveBeenCalledWith(sql, []);
  });

  test('createBatch handles different data types correctly', async () => {
    const dateOfBirth = new Date('2000-01-01');
    const sql = 'INSERT INTO "Users" ("name", "dateOfBirth") VALUES ($1, $2);';
    await user.createBatch([{name: 'Alice', dateOfBirth}]);
    expect(db.query).toHaveBeenCalledWith(sql, ['Alice', dateOfBirth]);
  });
});

describe('BaseSqlRepository transformWhereToSQL', () => {
  const transformWhereToSQL = user['transformWhereToSQL'];
  test('transforms simple condition', () => {
    const where = {name: 'Alice'};
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('"name" = $1');
    expect(params).toEqual(['Alice']);
  });

  test('handles nested AND/OR conditions', () => {
    const where = {
      AND: [{name: 'Alice'}, {OR: [{age: 25}, {country: 'Wonderland'}]}],
    };
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('("name" = $1 AND ("age" = $2 OR "country" = $3))');
    expect(params).toEqual(['Alice', 25, 'Wonderland']);
  });

  test('processes array conditions with ANY', () => {
    const where = {id: ['1', '2', '3']};
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('"id" = ANY($1)');
    expect(params).toEqual([['1', '2', '3']]);
  });

  test('handles advanced comparison operators', () => {
    const where = {age: {'>': 25, '<=': 30}};
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('"age" > $1 AND "age" <= $2');
    expect(params).toEqual([25, 30]);
  });

  test('combines different types of conditions', () => {
    const where = {
      age: {'>': 25},
      name: ['Alice', 'Bob'],
      status: 'active',
    };
    const [sqlWhere, params] = transformWhereToSQL(where, 2);
    expect(sqlWhere).toBe('"age" > $2 AND "name" = ANY($3) AND "status" = $4');
    expect(params).toEqual([25, ['Alice', 'Bob'], 'active']);
  });

  test('handles deeply nested AND/OR conditions', () => {
    const where = {
      AND: [{name: 'Alice'}, {OR: [{age: {'>': 30}}, {AND: [{country: 'Wonderland'}, {status: 'active'}]}]}],
    };
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('("name" = $1 AND ("age" > $2 OR ("country" = $3 AND "status" = $4)))');
    expect(params).toEqual(['Alice', 30, 'Wonderland', 'active']);
  });

  test('handles complex nested conditions with various comparison operators', () => {
    const where = {
      OR: [
        {age: {'<=': 18}},
        {
          AND: [
            {role: 'admin'},
            {status: {'!=': 'inactive'}},
            {OR: [{lastLogin: {'>': new Date('2021-01-01')}}, {created: {'<': new Date('2020-01-01')}}]},
          ],
        },
      ],
    };
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('("age" <= $1 OR ("role" = $2 AND "status" <> $3 AND ("lastLogin" > $4 OR "created" < $5)))');
    expect(params).toEqual([18, 'admin', 'inactive', new Date('2021-01-01'), new Date('2020-01-01')]);
  });

  test('handles nested conditions with arrays', () => {
    const where = {
      AND: [{id: ['1', '2', '3']}, {OR: [{name: 'Alice'}, {tags: ['tag1', 'tag2']}]}],
    };
    const [sqlWhere, params] = transformWhereToSQL(where);
    expect(sqlWhere).toBe('("id" = ANY($1) AND ("name" = $2 OR "tags" = ANY($3)))');
    expect(params).toEqual([['1', '2', '3'], 'Alice', ['tag1', 'tag2']]);
  });
});
