import {IBaseEntity} from '../cntr/IBaseEntity';

export default abstract class BaseEntity implements IBaseEntity {
  abstract readonly tag: string;
}
