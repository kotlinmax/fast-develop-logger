import {asClass, asValue, createContainer} from 'awilix';

import {ILogRecordWsRouter} from './cntr/routes/ILogRecordWsRouter';
import {ILogRecordHttpRouter} from './cntr/routes/ILogRecordHttpRouter';
import {IBaseQueueConsumer} from '../../bases/cntr/IBaseQueueConsumer';
import {ILogRecordHttpService} from './cntr/services/ILogRecordHttpService';
import {ILogRecordQueueService} from './cntr/services/ILogRecordQueueService';
import {ILogRecordWsService} from './cntr/services/ILogRecordWsService';
import {ILogRecordModule} from './cntr/ILogRecordModule';
import {ILogRecordQueueController} from './cntr/controllers/ILogRecordQueueController';
import {ILogRecordHttpController} from './cntr/controllers/ILogRecordHttpController';
import {ILogRecordWsController} from './cntr/controllers/ILogRecordWsController';
import {ILogRecordQueueConsumer} from './cntr/ILogRecordQueueConsumer';
import {TModuleInfrastructure} from '../../infra';

import BaseModule from '../../bases/cntr/IBaseModule';
import LogRecordWsRouter from './impl/routes/LogRecordWsRouter';
import LogRecordWsController from './impl/controllers/LogRecordWsController';
import LogRecordHttpRouter from './impl/routes/LogRecordHttpRouter';
import LogRecordHttpController from './impl/controllers/LogRecordHttpController';
import LogRecordSqlRepository from './impl/LogRecordSqlRepository';
import LogRecordHttpService from './impl/services/LogRecordHttpService';
import LogRecordQueueConsumer from './impl/LogRecordQueueConsumer';
import LogRecordQueueService from './impl/services/LogRecordQueueService';
import LogRecordWsService from './impl/services/LogRecordWsService';
import LogRecordQueueController from './impl/controllers/LogRecordQueueController';

export default class LogRecordModule extends BaseModule implements ILogRecordModule {
  readonly tag: string = 'LogRecordModule';

  readonly httpRouter: ILogRecordHttpRouter;
  readonly wsRouter: ILogRecordWsRouter;
  readonly consumers: IBaseQueueConsumer[];

  // prettier-ignore
  constructor(infra: TModuleInfrastructure) {
    super();

    // Docs of IoC: https://www.npmjs.com/package/awilix
    const module = createContainer();

    module.register({
      db:       asValue(infra.db)     ,
      env:      asValue(infra.env)    ,
      emitter:  asValue(infra.emitter),
      logger:   asValue(infra.logger) ,
    });

    module.register({
      logRecordRepository     :  asClass(LogRecordSqlRepository    ).singleton(),
      logRecordHttpController :  asClass(LogRecordHttpController   ).singleton(),
      logRecordHttpService    :  asClass(LogRecordHttpService      ).singleton(),
      logRecordHttpRouter     :  asClass(LogRecordHttpRouter       ).singleton(),
      logRecordQueueController:  asClass(LogRecordQueueController  ).singleton(),
      logRecordQueueService   :  asClass(LogRecordQueueService     ).singleton(),
      logRecordQueueConsumer  :  asClass(LogRecordQueueConsumer    ).singleton(),
      logRecordWsController   :  asClass(LogRecordWsController     ).singleton(),
      logRecordWsService      :  asClass(LogRecordWsService        ).singleton(),
      logRecordWsRouter       :  asClass(LogRecordWsRouter         ).singleton(),
    });

    module.resolve<ILogRecordHttpRouter     >  ('logRecordRepository'      );
    module.resolve<ILogRecordHttpController >  ('logRecordHttpController'  );
    module.resolve<ILogRecordHttpService    >  ('logRecordHttpService'     );
    module.resolve<ILogRecordHttpRouter     >  ('logRecordHttpRouter'      );
    module.resolve<ILogRecordQueueController>  ('logRecordQueueController' );
    module.resolve<ILogRecordQueueService   >  ('logRecordQueueService'    );
    module.resolve<ILogRecordWsController   >  ('logRecordWsController'    );
    module.resolve<ILogRecordWsService      >  ('logRecordWsService'       );
    module.resolve<ILogRecordWsRouter       >  ('logRecordWsRouter'        );

    this.httpRouter =   module.resolve<ILogRecordHttpRouter>    ('logRecordHttpRouter'    );
    this.wsRouter   =   module.resolve<ILogRecordWsRouter>      ('logRecordWsRouter'      );
    this.consumers  = [ module.resolve<ILogRecordQueueConsumer> ('logRecordQueueConsumer' ) ] ;

  }
}
