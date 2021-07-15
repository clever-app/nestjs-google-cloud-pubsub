import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IGCloudPubSubSubscriberOptions } from './gcloud-pubsub-subscriber-options.interface';
export interface IGCloudPubSubSubscriberAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<IGCloudPubSubSubscriberOptions> | IGCloudPubSubSubscriberOptions;
  inject?: any[];
}
