import {FastifyBaseLogger} from 'fastify';

export interface ILogger {
  getLogger(): unknown;
  info(msg: string): void;
  debug(msg: string): void;
  error(msg: string): void;
  fatal(msg: string): void;
  trace(msg: string): void;
  warn(msg: string): void;
}

export interface ILoggerFastify extends ILogger {
  getLogger(): FastifyBaseLogger;
}
