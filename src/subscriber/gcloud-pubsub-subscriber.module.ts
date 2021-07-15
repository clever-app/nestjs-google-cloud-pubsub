import { DynamicModule, Module } from '@nestjs/common';
import { GCloudPubSubSubscriber } from './gcloud-pubsub-subscriber';
import { IGCloudPubSubSubscriberAsyncOptions } from './gcloud-pubsub-subscriber-async-options.interface';
import { IGCloudPubSubSubscriberOptions } from './gcloud-pubsub-subscriber-options.interface';
import { GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS } from './gcloud-pubsub-subscriber.constants';

@Module({
  providers: [GCloudPubSubSubscriber],
  exports: [GCloudPubSubSubscriber],
})
export class GCloudPubSubSubscriberModule {
  static forRoot(options: IGCloudPubSubSubscriberOptions): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS,
      useValue: options,
    };

    const gcPbSubscriberProvider = {
      provide: GCloudPubSubSubscriber,
      useFactory: (opt: IGCloudPubSubSubscriberOptions) =>
        new GCloudPubSubSubscriber(opt),
      inject: [GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS],
    };

    return {
      module: GCloudPubSubSubscriberModule,
      providers: [gcsModuleOptions, gcPbSubscriberProvider],
      exports: [GCloudPubSubSubscriber],
    };
  }

  static forRootAsync(
    options: IGCloudPubSubSubscriberAsyncOptions
  ): DynamicModule {
    const gcPbSubscriberProvider = {
      provide: GCloudPubSubSubscriber,
      useFactory: (opt: IGCloudPubSubSubscriberOptions) =>
        new GCloudPubSubSubscriber(opt),
      inject: [GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS],
    };

    return {
      module: GCloudPubSubSubscriberModule,
      imports: options.imports,
      providers: [
        {
          // for useFactory
          provide: GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        gcPbSubscriberProvider,
      ],
      exports: [GCloudPubSubSubscriber],
    };
  }
}
