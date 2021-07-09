import { DynamicModule, Module } from '@nestjs/common';
import { GCLOUD_PUBSUB_MODULE_OPTIONS } from './constants/gcloud-pubsub.constants';
import { IGCloudPubSubAsyncOptions } from './interfaces/gcloud-pubsub-async-options.interface';
import { IGCloudPubSubOptions } from './interfaces/gcloud-pubsub-options.interface';
import { GCloudPubSubServer } from './microservice/gcloud-pubsub-server';

@Module({
  providers: [GCloudPubSubServer],
  exports: [GCloudPubSubServer],
})
export class GCloudPubSubModule {
  static forRoot(options: IGCloudPubSubOptions): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_PUBSUB_MODULE_OPTIONS,
      useValue: options,
    };

    const gcsServiceProvider = {
      provide: GCloudPubSubServer,
      useFactory: (opt: IGCloudPubSubOptions) => new GCloudPubSubServer(opt),
      inject: [GCLOUD_PUBSUB_MODULE_OPTIONS],
    };

    return {
      module: GCloudPubSubModule,
      providers: [gcsModuleOptions, gcsServiceProvider],
      exports: [GCloudPubSubServer],
    };
  }

  static forRootAsync(options: IGCloudPubSubAsyncOptions): DynamicModule {
    const gcsServiceProvider = {
      provide: GCloudPubSubServer,
      useFactory: (opt: IGCloudPubSubOptions) => new GCloudPubSubServer(opt),
      inject: [GCLOUD_PUBSUB_MODULE_OPTIONS],
    };

    return {
      module: GCloudPubSubModule,
      imports: options.imports,
      providers: [
        {
          // for useFactory
          provide: GCLOUD_PUBSUB_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        gcsServiceProvider,
      ],
      exports: [GCloudPubSubServer],
    };
  }
}
