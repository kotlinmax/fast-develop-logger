import {IBaseEntity} from '../../../bases/cntr/IBaseEntity';
import {IBaseEvents} from '../../../bases/cntr/IBaseEvents';

export interface ILogRecordEvents extends IBaseEvents {
  LISTEN_QUEUE_CONSUMER: string;
}
