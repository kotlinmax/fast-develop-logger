import {IBaseHttpService} from '../../cntr/services/IBaseHttpService';

export default abstract class BaseHttpService implements IBaseHttpService {
  abstract readonly tag: string;
}
