import {IBaseWsService} from '../../cntr/services/IBaseWsService';

export default abstract class BaseWsService implements IBaseWsService {
  abstract readonly tag: string;
}
