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
    });
  }

  info(msg: string): void {
    this.logger.info(msg);
  }

  debug(msg: string): void {
    this.logger.debug(msg);
  }

  error(msg: string): void {
    this.logger.error(msg);
  }

  fatal(msg: string): void {
    this.logger.fatal(msg);
  }

  trace(msg: string): void {
    this.logger.trace(msg);
  }

  warn(msg: string): void {
    this.logger.warn(msg);
  }
}
