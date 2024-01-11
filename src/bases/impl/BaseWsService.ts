import {IBaseWsService} from '../cntr/IBaseWsService';

export default abstract class BaseWsService implements IBaseWsService {
  abstract readonly tag: string;
}
