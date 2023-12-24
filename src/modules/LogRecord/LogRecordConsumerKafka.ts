import {ILogger} from '../../infrastructure/loggers/ILogger';
import {IProcessEnv} from '../../infrastructure/env/IEnvironment';
import {IQueueConsumer, IEachMessagePayload} from '../ICommon';

import QueueConsumerKafka from '../../infrastructure/queues/QueueConsumerKafka';

const env = process.env as IProcessEnv;

class LogRecordConsumerKafka extends QueueConsumerKafka implements IQueueConsumer {
  public get tag() {
    return 'LogRecordQueueConsumerKafka';
  }

  constructor(private logger: ILogger) {
    super({
      brokers: [env.LOGGER_CONSUMER_BROKER],
      groupId: env.LOGGER_CONSUMER_GROUP_ID,
      clientId: env.LOGGER_CONSUMER_CLIENT_ID,
      topic: env.LOGGER_CONSUMER_TOPIC,
    });
  }

  override async eachMessageHandler(payload: IEachMessagePayload): Promise<void> {
    try {
      this.logger.info(`[${this.tag}]: Received message: ${payload.message.value?.toString()}`);
    } catch (error) {
      this.logger.error(`[${this.tag}]: EachMessageHandler error: ${error}`);
    }
  }
}

export default LogRecordConsumerKafka;
