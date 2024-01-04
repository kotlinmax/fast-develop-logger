// migrations/1702827909215_create_table_logs.js

exports.shorthands = undefined;

// apply migrate
exports.up = ({sql}) => {
  sql(`
    CREATE EXTENSION IF NOT EXISTS btree_gin                                          ;

    CREATE TABLE "LogRecords" (
      "id"              serial          PRIMARY KEY                                   ,
      "ipCustomer"      varchar(15)     NOT NULL                                      ,
      "timestamp"       timestamp       NOT NULL     DEFAULT current_timestamp        ,
      "level"           varchar(10)     NOT NULL                                      ,
      "message"         text            NOT NULL                                      ,
      "data"            jsonb                                                         ,
      "extraData"       jsonb                                                         ,
      "handler"         varchar(255)    NOT NULL                                      ,
      "from"            varchar(255)    NOT NULL
    )                                                                                 ;

    CREATE INDEX logs_message_idx       ON "LogRecords" USING gin ("message"   )      ;
    CREATE INDEX logs_level_idx         ON "LogRecords"           ("level"     )      ;
    CREATE INDEX logs_ip_customer_idx   ON "LogRecords"           ("ipCustomer")      ;
    CREATE INDEX logs_timestamp_idx     ON "LogRecords"           ("timestamp" )      ;
    CREATE INDEX logs_handler_idx       ON "LogRecords"           ("handler"   )      ;
    CREATE INDEX logs_from_idx          ON "LogRecords"           ("from"      )      ;

    CREATE FUNCTION notify_about_insert_log_record_raw() RETURNS trigger AS
    $$
      DECLARE payload TEXT;
      BEGIN
        payload := json_build_object(
          'id',NEW."id",
          'timestamp',NEW."timestamp"
        );

        PERFORM pg_notify('log_record', payload);
        RETURN NEW;
      END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER trigger_notify_about_new_log_record_raw
    AFTER INSERT ON "LogRecords" FOR EACH ROW EXECUTE FUNCTION notify_about_insert_log_record_raw();

  `);
};

// revert migrate
exports.down = ({sql}) => {
  sql(`
    DROP TRIGGER IF EXISTS trigger_notify_about_new_log_record_raw ON "LogRecords";
    DROP FUNCTION IF EXISTS notify_about_insert_log_record_raw;

    DROP INDEX IF EXISTS logs_from_idx;
    DROP INDEX IF EXISTS logs_handler_idx;
    DROP INDEX IF EXISTS logs_timestamp_idx;
    DROP INDEX IF EXISTS logs_ip_customer_idx;
    DROP INDEX IF EXISTS logs_level_idx;
    DROP INDEX IF EXISTS logs_message_idx;

    DROP TABLE IF EXISTS "LogRecords";

    -- Отключите расширение btree_gin, только если оно больше не используется другими таблицами
    -- DROP EXTENSION IF EXISTS btree_gin;
  `);
};
