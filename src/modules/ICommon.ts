import {type EachMessagePayload} from 'kafkajs';
import {ILogger} from '../infra/log/ILogger';
import {IProcessEnv} from '../infra/env/IEnvironment';
import {IDatabaseSQL} from '../infra/db/IDatabaseSQL';

export interface IEachMessagePayload extends EachMessagePayload {}

export interface IModuleConstructor {
  logger: ILogger;
  env: IProcessEnv;
  db: IDatabaseSQL;
}
