import {Kafka, Producer, ProducerRecord, RecordMetadata} from 'kafkajs';
import {IQueueClient} from '../ctrl/IQueueClients';
import {ILogger} from '../../logger/ILogger';

interface IConstructor {
  brokers: string[];
  clientId: string;
  logger: ILogger;
}

export default class QueueClient implements IQueueClient {
  private producer: Producer;
  private logger: ILogger;
  private isConnected: boolean;

  constructor(opts: IConstructor) {
    const kafka = new Kafka({clientId: opts.clientId, brokers: opts.brokers});
    this.producer = kafka.producer();
    this.isConnected = false;
    this.logger = opts.logger;
  }

  private async connect(): Promise<void> {
    try {
      await this.producer.connect();
      this.isConnected = true;
    } catch (error) {
      this.logger.error(`Kafka producer connect error: `, error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      this.isConnected = false;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendMsg({topic, messages}: ProducerRecord): Promise<RecordMetadata[] | undefined> {
    try {
      if (!this.isConnected) {
        this.logger.warn('Producer is not connected. Attempting to reconnect.');
        await this.connect();
      }
      return await this.producer.send({topic, messages});
    } catch (error) {
      this.logger.error(`Error sending message to topic ${topic}:`, error);
    }
  }
}
