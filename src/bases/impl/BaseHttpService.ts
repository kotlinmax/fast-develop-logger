import {IBaseHttpService} from '../cntr/IBaseHttpService';

export default abstract class BaseHttpService implements IBaseHttpService {
  abstract readonly tag: string;
}
