import {IHttpClient} from '../ctrl/IHttpClient';

interface IConstructor {
  domain: string;
}

export default class HttpClient implements IHttpClient {
  domain: string;

  constructor({domain}: IConstructor) {
    this.domain = domain;
  }

  get<T>(path: string, opts: Record<string, unknown>): Promise<T> {
    throw new Error('Not implement method');
  }

  post<T>(path: string, body: Record<string, unknown>, opts: Record<string, unknown>): Promise<T> {
    throw new Error('Not implement method');
  }

  put<T>(path: string, body: Record<string, unknown>, opts: Record<string, unknown>): Promise<T> {
    throw new Error('Not implement method');
  }
}
