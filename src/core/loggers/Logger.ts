import pino from 'pino';

import {FastifyBaseLogger} from 'fastify';
import {ILoggerFastify} from './ILogger';

export default class Logger implements ILoggerFastify {
  private logger: FastifyBaseLogger;

  getLogger(): FastifyBaseLogger {
    return this.logger;
  }

  constructor() {
    this.logger = pino({
      level: 'trace',
      transport: {target: 'pino-pretty', options: {colorize: true}},
      serializers: {
        func: (value) => value.toString(),
      },
    });
  }

  info<T extends object>(data: T, msg?: string, ...args: any[]): void;
  info(data: unknown, msg?: string, ...args: any[]): void;
  info(data: string, ...args: any[]): void {
    this.logger.info(data, ...args);
  }

  debug<T extends object>(data: T, msg?: string, ...args: any[]): void;
  debug(data: unknown, msg?: string, ...args: any[]): void;
  debug(data: string, ...args: any[]): void {
    this.logger.debug(data, ...args);
  }

  error(data: unknown): void {
    this.logger.error(data);
  }

  fatal(data: unknown): void {
    this.logger.fatal(data);
  }

  trace(data: unknown): void {
    this.logger.trace(data);
  }

  warn(data: unknown): void {
    this.logger.warn(data);
  }
}
