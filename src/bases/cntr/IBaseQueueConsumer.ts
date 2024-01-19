import {IEnv} from '../../infra/env/IEnvironment';
import {ILogger} from '../../infra/logger/ILogger';

export interface IBaseQueueConsumer {
  run(): Promise<void>;
}
