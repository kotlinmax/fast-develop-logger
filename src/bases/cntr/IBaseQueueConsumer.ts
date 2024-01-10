import {IProcessEnv} from '../../infra/env/IEnvironment';
import {ILogger} from '../../infra/log/ILogger';

export interface IBaseQueueConsumer {
  run(): Promise<void>;
}

export interface IBaseQueueConsumerConstructor {
  logger: ILogger;
  env: IProcessEnv;
}
