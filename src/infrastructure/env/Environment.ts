import {IExtraProcessEnv, IProcessEnv} from './IEnvironment';
import {config as envConfig} from 'dotenv';

export default class Environment {
  static getEnv(): IProcessEnv {
    return process.env as IProcessEnv;
  }

  static init() {
    if (process.env.NODE_ENV === undefined) {
      throw new Error(`process.env.NODE_ENV is undefined`);
    }

    envConfig({path: `.env.${process.env.NODE_ENV}`});

    const keys: (keyof IExtraProcessEnv)[] = [
      'HTTP_SERVER_PORT',
      'POSTGRES_USER',
      'POSTGRES_SERVICE',
      'POSTGRES_DB',
      'POSTGRES_PASSWORD',
      'POSTGRES_PORT',
      'POSTGRES_MAX',
      'LOG_RECORD_CONSUMER_BROKER',
      'LOG_RECORD_CONSUMER_GROUP_ID',
      'LOG_RECORD_CONSUMER_CLIENT_ID',
      'LOG_RECORD_CONSUMER_TOPIC',
      'LOG_RECORD_BATCH_SIZE',
    ];

    keys.forEach((key: keyof IExtraProcessEnv) => {
      if (process.env[key] === undefined) {
        throw new Error(`${key} in .env file is not defined`);
      }
    });
  }
}
