// src/interfaces/IEnv.ts

export type IDefaultProcessEnv = typeof process.env;

export type IExtraProcessEnv = {
  HTTP_SERVER_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_SERVICE: string;
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: string;
  POSTGRES_MAX: string;
  LOG_RECORD_CONSUMER_BROKER: string;
  LOG_RECORD_CONSUMER_GROUP_ID: string;
  LOG_RECORD_CONSUMER_CLIENT_ID: string;
  LOG_RECORD_CONSUMER_TOPIC: string;
  LOG_RECORD_BATCH_SIZE: string;
};

export type IEnv = IDefaultProcessEnv & IExtraProcessEnv;
