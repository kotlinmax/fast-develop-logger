import {type Consumer, type EachMessagePayload, Kafka} from 'kafkajs';
import {IBaseQueueConsumer} from '../cntr/IBaseQueueConsumer';
import BaseClass from '..';

export interface IKafkaConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topic: string;
}

abstract class BaseQueueConsumer extends BaseClass implements IBaseQueueConsumer {
  private topic: string;
  private consumer: Consumer;

  constructor(config: IKafkaConfig) {
    super();
    const {clientId, brokers, groupId, topic} = config;
    const queue = new Kafka({clientId, brokers});

    this.topic = topic;
    this.consumer = queue.consumer({groupId});
  }

  public async run() {
    await this.consumer.connect();
    await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
    await this.consumer.run({eachMessage: (payload) => this.eachMessageHandler(payload)});
  }

  protected abstract eachMessageHandler(payload: EachMessagePayload): Promise<void>;
}

export default BaseQueueConsumer;
