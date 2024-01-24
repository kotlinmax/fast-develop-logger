import {asClass, asValue, createContainer} from 'awilix';

import {TModuleInfrastructure     } from '../../infra';
import {ILogRecordModule          } from './cntr/ILogRecordModule';
import {ILogRecordSqlRepository   } from './cntr/ILogRecordSqlRepository';
import {ILogRecordQueueRouter     } from './cntr/routes/ILogRecordQueueRouter';
import {ILogRecordHttpRouter      } from './cntr/routes/ILogRecordHttpRouter';
import {ILogRecordWsktRouter      } from './cntr/routes/ILogRecordWsktRouter';
import {ILogRecordQueueController } from './cntr/controllers/ILogRecordQueueController';
import {ILogRecordHttpController  } from './cntr/controllers/ILogRecordHttpController';
import {ILogRecordWsktController  } from './cntr/controllers/ILogRecordWsktController';
import {ILogRecordQueueService    } from './cntr/services/ILogRecordQueueService';
import {ILogRecordHttpService     } from './cntr/services/ILogRecordHttpService';
import {ILogRecordWsktService     } from './cntr/services/ILogRecordWsktService';

import BaseModule                   from '../../bases/impl/BaseModule';
import LogRecordSqlRepository       from './impl/LogRecordSqlRepository';
import LogRecordQueueRouter         from './impl/routes/LogRecordQueueRouter';
import LogRecordHttpRouter          from './impl/routes/LogRecordHttpRouter';
import LogRecordWsRouter            from './impl/routes/LogRecordWsktRouter';
import LogRecordQueueController     from './impl/controllers/LogRecordQueueController';
import LogRecordWsktController      from './impl/controllers/LogRecordWsktController';
import LogRecordHttpController      from './impl/controllers/LogRecordHttpController';
import LogRecordQueueService        from './impl/services/LogRecordQueueService';
import LogRecordHttpService         from './impl/services/LogRecordHttpService';
import LogRecordWsktService         from './impl/services/LogRecordWsktService';
import LogRecordEvents from './impl/LogRecordEvents';
import { ILogRecordEvents } from './cntr/ILogRecordEvents';

export default class LogRecordModule extends BaseModule implements ILogRecordModule {
  readonly tag: string = 'LogRecordModule';

  readonly queueRouter: ILogRecordQueueRouter;
  readonly httpRouter : ILogRecordHttpRouter ;
  readonly wsktRouter : ILogRecordWsktRouter ;

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
      logRecordRepository     :  asClass(LogRecordSqlRepository   ).singleton(),
      logRecordEvents         :  asClass(LogRecordEvents          ).singleton(),
      logRecordQueueRouter    :  asClass(LogRecordQueueRouter     ).singleton(),
      logRecordHttpRouter     :  asClass(LogRecordHttpRouter      ).singleton(),
      logRecordWsktRouter     :  asClass(LogRecordWsRouter        ).singleton(),
      logRecordQueueService   :  asClass(LogRecordQueueService    ).singleton(),
      logRecordHttpService    :  asClass(LogRecordHttpService     ).singleton(),
      logRecordWsktService    :  asClass(LogRecordWsktService     ).singleton(),
      logRecordQueueController:  asClass(LogRecordQueueController ).singleton(),
      logRecordHttpController :  asClass(LogRecordHttpController  ).singleton(),
      logRecordWsktController :  asClass(LogRecordWsktController  ).singleton(),
    });

    module.resolve<ILogRecordSqlRepository  > ('logRecordRepository'      );
    module.resolve<ILogRecordEvents         > ('logRecordEvents'          );
    module.resolve<ILogRecordQueueController> ('logRecordQueueController' );
    module.resolve<ILogRecordHttpController > ('logRecordHttpController'  );
    module.resolve<ILogRecordWsktController > ('logRecordWsktController'  );
    module.resolve<ILogRecordQueueService   > ('logRecordQueueService'    );
    module.resolve<ILogRecordHttpService    > ('logRecordHttpService'     );
    module.resolve<ILogRecordWsktService    > ('logRecordWsktService'     );

    this.queueRouter =  module.resolve<ILogRecordQueueRouter> ('logRecordQueueRouter' );
    this.httpRouter  =  module.resolve<ILogRecordHttpRouter > ('logRecordHttpRouter'  );
    this.wsktRouter  =  module.resolve<ILogRecordWsktRouter > ('logRecordWsktRouter'  );
  }
}
