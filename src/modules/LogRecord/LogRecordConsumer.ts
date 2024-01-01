import {ILogger} from '../../infrastructure/loggers/ILogger';
import {IQueueConsumer, IEachMessagePayload, IQueueConsumerConstructor} from '../ICommon';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordService} from './interfaces/ILogRecordService';

import QueueConsumerKafka from '../../infrastructure/queues/QueueConsumerKafka';
import LogRecordEntity from './LogRecordEntity';

interface ILogRecordConsumerKafKaConstructor extends IQueueConsumerConstructor {
  service: ILogRecordService;
}

class LogRecordConsumer extends QueueConsumerKafka implements IQueueConsumer {
  private logger: ILogger;
  private service: ILogRecordService;

  private batch: ILogRecordEntity[] = [];
  private batchSize = 100;

  private lastQueueMessageTime = Date.now();
  private interval = 1000;

  constructor({env, logger, service}: ILogRecordConsumerKafKaConstructor) {
    super({
      brokers: [env.LOGGER_CONSUMER_BROKER],
      groupId: env.LOGGER_CONSUMER_GROUP_ID,
      clientId: env.LOGGER_CONSUMER_CLIENT_ID,
      topic: env.LOGGER_CONSUMER_TOPIC,
    });

    this.logger = logger;
    this.service = service;
  }

  public get tag() {
    return 'LogRecordQueueConsumerKafka';
  }

  override async eachMessageHandler(payload: IEachMessagePayload): Promise<void> {
    if (payload.message.value === null) {
      return;
    }

    this.logger.debug(`[${this.tag}]: Received message: ${payload.message.value}`);

    try {
      const message: string = payload.message.value.toString();
      const logRecord: ILogRecordEntity = JSON.parse(message);
      const logRecordEntity = new LogRecordEntity(logRecord);

      this.batch.push(logRecordEntity);

      const isBatchMessagesFully = this.batch.length >= this.batchSize;
      const isTimeForSave = Date.now() >= this.lastQueueMessageTime + this.interval;

      if (isBatchMessagesFully || isTimeForSave) {
        // Reset
        this.batch = [];
        this.lastQueueMessageTime = Date.now();

        await this.service.createBatchLogRecords(this.batch);
      }
    } catch (error) {
      this.logger.error(`[${this.tag}]: EachMessageHandler error: ${error}`);
    }
  }
}

export default LogRecordConsumer;
