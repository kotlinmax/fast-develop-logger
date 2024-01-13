import {type EachMessagePayload} from 'kafkajs';
import {ILogger} from '../infra/logger/ILogger';
import {IEnv} from '../infra/env/IEnvironment';
import {IDatabaseSQL} from '../infra/db/IDatabaseSQL';
import {IEmitter} from '../infra/emitter/IEmitter';

export interface IEachMessagePayload extends EachMessagePayload {}

export interface IModuleConstructor {
  logger: ILogger;
  env: IEnv;
  db: IDatabaseSQL;
  emitter: IEmitter;
}
