import {type Consumer, type EachMessagePayload, Kafka} from 'kafkajs';
import {TCallback} from '../servers/interfaces/IWebSocketServer';

export interface IKafkaConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topic: string;
}

abstract class QueueConsumerKafka {
  private topic: string;
  private consumer: Consumer;
  private callback?: TCallback;

  constructor(config: IKafkaConfig) {
    const {clientId, brokers, groupId, topic} = config;
    const queue = new Kafka({clientId, brokers});

    this.topic = topic;
    this.consumer = queue.consumer({groupId});
  }

  public async run() {
    await this.consumer.connect();
    await this.consumer.subscribe({topic: this.topic, fromBeginning: true});
    await this.consumer.run({eachMessage: (payload) => this.eachMessageHandler(payload, this.callback)});
  }

  public async setCallback(callback: TCallback) {
    this.callback = callback;
  }

  protected abstract eachMessageHandler(payload: EachMessagePayload, callback?: TCallback): Promise<void>;
}

export default QueueConsumerKafka;
