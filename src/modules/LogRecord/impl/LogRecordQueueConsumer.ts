import LogRecordEntity from './LogRecordEntity';
import BaseQueueConsumer from '../../../bases/impl/BaseQueueConsumer';

import {ILogger} from '../../../infra/logger/ILogger';
import {IEachMessagePayload} from '../../ICommon';
import {ILogRecordEntity} from '../cntr/ILogRecordEntity';
import {TCallback} from '../../../infra/servers/cnrt/IWsServer';
import {ILogRecordQueueConsumer} from '../cntr/ILogRecordQueueConsumer';
import {ILogRecordQueueService} from '../cntr/services/ILogRecordQueueService';
import {IEnv} from '../../../infra/env/IEnvironment';
import {TConsumerInfrastructure} from '../../../infra';
import {IEmitter} from '../../../infra/emitter/IEmitter';

interface IConstructor extends TConsumerInfrastructure {
  logRecordQueueService: ILogRecordQueueService;
}

export default class LogRecordQueueConsumer extends BaseQueueConsumer implements ILogRecordQueueConsumer {
  readonly tag: string = 'LogRecordQueueConsumer';

  private env: IEnv;
  private logger: ILogger;
  private emitter: IEmitter;
  private service: ILogRecordQueueService;

  private batch: ILogRecordEntity[] = [];
  private batchSize = 100;

  private lastQueueMessageTime = Date.now();
  private interval = 1000;

  constructor(opts: IConstructor) {
    super({
      brokers: [opts.env.LOG_RECORD_CONSUMER_BROKER],
      groupId: opts.env.LOG_RECORD_CONSUMER_GROUP_ID,
      clientId: opts.env.LOG_RECORD_CONSUMER_CLIENT_ID,
      topic: opts.env.LOG_RECORD_CONSUMER_TOPIC,
    });

    this.env = opts.env;
    this.logger = opts.logger;
    this.emitter = opts.emitter;
    this.service = opts.logRecordQueueService;
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
        this.logger.debug(`[${this.tag}]: created success: ${ids}`);
      }
    } catch (error) {
      this.logger.error(`[${this.tag}]: EachMessageHandler error: ${error}`);
    }
  }
}
