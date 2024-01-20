export interface IBaseClass {
  tag: string;
}
export default abstract class BaseClass implements IBaseClass {
  abstract readonly tag: string;
}
