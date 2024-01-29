import {ProducerRecord, RecordMetadata} from 'kafkajs';

export interface IQueueClient {
  sendMsg: (record: ProducerRecord) => Promise<RecordMetadata[] | undefined>;
}
