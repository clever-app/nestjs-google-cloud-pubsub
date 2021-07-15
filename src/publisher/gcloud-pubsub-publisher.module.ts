import { DynamicModule, Module } from '@nestjs/common';
import { GCloudPubSubPublisher } from './gcloud-pubsub-publisher';
import { IGCloudPubSubPublisherAsyncOptions } from './gcloud-pubsub-publisher-async-options.interface';
import { IGCloudPubSubPublisherOptions } from './gcloud-pubsub-publisher-options.interface';
import { GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS } from './gcloud-pubsub-publisher.constants';

@Module({
  providers: [GCloudPubSubPublisherModule],
  exports: [GCloudPubSubPublisherModule],
})
export class GCloudPubSubPublisherModule {
  static forRoot(options: IGCloudPubSubPublisherOptions): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS,
      useValue: options,
    };

    const gcPbPublisherProvider = {
      provide: GCloudPubSubPublisher,
      useFactory: (opt: IGCloudPubSubPublisherOptions) =>
        new GCloudPubSubPublisher(opt),
      inject: [GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS],
    };

    return {
      module: GCloudPubSubPublisherModule,
      providers: [gcsModuleOptions, gcPbPublisherProvider],
      exports: [GCloudPubSubPublisher],
    };
  }

  static forRootAsync(
    options: IGCloudPubSubPublisherAsyncOptions
  ): DynamicModule {
    const gcPbPublisherProvider = {
      provide: GCloudPubSubPublisher,
      useFactory: (opt: IGCloudPubSubPublisherOptions) =>
        new GCloudPubSubPublisher(opt),
      inject: [GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS],
    };

    return {
      module: GCloudPubSubPublisherModule,
      imports: options.imports,
      providers: [
        {
          // for useFactory
          provide: GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        gcPbPublisherProvider,
      ],
      exports: [GCloudPubSubPublisher],
    };
  }
}
