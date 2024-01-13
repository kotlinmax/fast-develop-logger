import EventEmitter from 'events';
import {IEmitter} from './IEmitter';

export default class Emitter extends EventEmitter implements IEmitter {}
