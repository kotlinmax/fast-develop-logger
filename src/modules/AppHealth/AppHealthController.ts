import {IHttpRequest, IHttpResponse} from '../../infra/servers/cnrt/IHttpServer';

export default class AppHealthController {
  constructor() {}

  public get tag() {
    return 'AppHealthController';
  }

  public async checkHealth(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.code(200).header('Content-Type', 'application/json; charset=utf-8').send({status: 'ok'});
  }
}
