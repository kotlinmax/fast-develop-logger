import {IExtraProcessEnv, IProcessEnv} from './IEnvironment';
import {config as envConfig} from 'dotenv';

export default class Environment {
  static getEnv(): IProcessEnv {
    return process.env as IProcessEnv;
  }

  static init() {
    console.log('TEST');
    envConfig({path: `.env.${process.env.NODE_ENV}`});

    const keys: (keyof IExtraProcessEnv)[] = [
      'HTTP_SERVER_PORT',
      'POSTGRES_USER',
      'POSTGRES_SERVICE',
      'POSTGRES_DB',
      'POSTGRES_PASSWORD',
      'POSTGRES_PORT',
      'POSTGRES_MAX',
      'LOGGER_CONSUMER_BROKER',
      'LOGGER_CONSUMER_GROUP_ID',
      'LOGGER_CONSUMER_CLIENT_ID',
      'LOGGER_CONSUMER_TOPIC',
    ];

    keys.forEach((key: keyof IExtraProcessEnv) => {
      if (process.env[key] === undefined) {
        throw new Error(`${key} in .env file is not defined`);
      }
    });
  }
}
