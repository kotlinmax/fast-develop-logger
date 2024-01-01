// src/interfaces/IProcessEnv.ts

export type IDefaultProcessEnv = typeof process.env;

export type IExtraProcessEnv = {
  HTTP_SERVER_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_SERVICE: string;
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: string;
  POSTGRES_MAX: string;
  LOGGER_CONSUMER_BROKER: string;
  LOGGER_CONSUMER_GROUP_ID: string;
  LOGGER_CONSUMER_CLIENT_ID: string;
  LOGGER_CONSUMER_TOPIC: string;
  BATCH_SIZE_LOG_RECORD: string;
};

export type IProcessEnv = IDefaultProcessEnv & IExtraProcessEnv;
