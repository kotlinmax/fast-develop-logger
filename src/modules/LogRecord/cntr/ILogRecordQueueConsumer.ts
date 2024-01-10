import {IBaseQueueConsumer} from '../../../bases/cntr/IBaseQueueConsumer';
import {TCallback} from '../../../infra/servers/cnrt/IWsServer';
import {IEachMessagePayload} from '../../ICommon';

export interface ILogRecordQueueConsumer extends IBaseQueueConsumer {
  eachMessageHandler(payload: IEachMessagePayload, callback?: TCallback): Promise<void>;
}
