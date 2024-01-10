import BaseValidate from '../../../bases/impl/BaseValidate';
import {ILogRecordValidate} from '../cntr/ILogRecordValidate';

export default class LogRecordValidate extends BaseValidate implements ILogRecordValidate {
  readonly tag: string = 'LogRecordValidate';
}
