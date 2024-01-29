export interface IHttpClient {
  domain: string;
  get: <T>(path: string, opts: Record<string, unknown>) => Promise<T>;
  post: <T>(path: string, body: Record<string, unknown>, opts: Record<string, unknown>) => Promise<T>;
  put: <T>(path: string, body: Record<string, unknown>, opts: Record<string, unknown>) => Promise<T>;
}
