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
  `);
};

// revert migrate
exports.down = ({sql}) => {
  sql('DROP TABLE IF EXISTS "LogRecords";');
};
