import {ILogger} from '../../core/loggers/ILogger';
import {IQueueConsumer, IEachMessagePayload, IQueueConsumerConstructor} from '../ICommon';
import {ILogRecordEntity} from './interfaces/ILogRecordEntity';
import {ILogRecordService} from './interfaces/ILogRecordService';
import {TCallback} from '../../core/servers/interfaces/IWebSocketServer';

import QueueConsumerKafka from '../../core/queues/QueueConsumerKafka';
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
      brokers: [env.LOG_RECORD_CONSUMER_BROKER],
      groupId: env.LOG_RECORD_CONSUMER_GROUP_ID,
      clientId: env.LOG_RECORD_CONSUMER_CLIENT_ID,
      topic: env.LOG_RECORD_CONSUMER_TOPIC,
    });

    this.logger = logger;
    this.service = service;
  }

  public get tag() {
    return '[LogRecordQueueConsumerKafka]';
  }

  override async eachMessageHandler(payload: IEachMessagePayload, callback?: TCallback): Promise<void> {
    if (payload.message.value === null) {
      return;
    }

    this.logger.debug(`[${this.tag}]: Received message: ${payload.message.value}`);

    try {
      const message: string = payload.message.value.toString();
      const logRecord: ILogRecordEntity = JSON.parse(message);
      const logRecordEntity = new LogRecordEntity(logRecord);

      if (callback) {
        callback(logRecord);
      }

      this.batch.push(logRecordEntity);

      const isBatchMessagesFully = this.batch.length >= this.batchSize;
      const isTimeForSave = Date.now() >= this.lastQueueMessageTime + this.interval;

      if (isBatchMessagesFully || isTimeForSave) {
        // Reset
        this.batch = [];
        this.lastQueueMessageTime = Date.now();

        const ids = await this.service.createBatchLogRecords(this.batch);
        this.logger.debug(`${this.tag}: created success: ${ids}`);
      }
    } catch (error) {
      this.logger.error(`${this.tag}: EachMessageHandler error: ${error}`);
    }
  }
}

export default LogRecordConsumer;
