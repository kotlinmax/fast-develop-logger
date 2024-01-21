import {EachMessagePayload} from 'kafkajs';
import {IBaseQueueConsumer} from '../../../bases/cntr/IBaseQueueConsumer';
import {TCallback} from '../../../infra/servers/cnrt/IWsktServer';

export interface ILogRecordQueueConsumer extends IBaseQueueConsumer {
  eachMessageHandler(payload: EachMessagePayload, callback?: TCallback): Promise<void>;
}
