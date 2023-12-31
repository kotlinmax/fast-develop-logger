import {FastifyBaseLogger} from 'fastify';

export interface ILogger {
  getLogger(): unknown;

  info<T extends object>(obj: T, msg?: string, ...args: any[]): void;
  info(obj: unknown, msg?: string, ...args: any[]): void;
  info(msg: string, ...args: any[]): void;

  debug<T extends object>(obj: T, msg?: string, ...args: any[]): void;
  debug(obj: unknown, msg?: string, ...args: any[]): void;
  debug(msg: string, ...args: any[]): void;

  error<T extends object>(obj: T, msg?: string, ...args: any[]): void;
  error(obj: unknown, msg?: string, ...args: any[]): void;
  error(msg: string, ...args: any[]): void;

  fatal<T extends object>(obj: T, msg?: string, ...args: any[]): void;
  fatal(obj: unknown, msg?: string, ...args: any[]): void;
  fatal(msg: string, ...args: any[]): void;

  trace<T extends object>(obj: T, msg?: string, ...args: any[]): void;
  trace(obj: unknown, msg?: string, ...args: any[]): void;
  trace(msg: string, ...args: any[]): void;

  warn<T extends object>(obj: T, msg?: string, ...args: any[]): void;
  warn(obj: unknown, msg?: string, ...args: any[]): void;
  warn(msg: string, ...args: any[]): void;
}

export interface ILoggerFastify extends ILogger {
  getLogger(): FastifyBaseLogger;
}
