import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IGCloudPubSubPublisherOptions } from './gcloud-pubsub-publisher-options.interface';
export interface IGCloudPubSubPublisherAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<IGCloudPubSubPublisherOptions> | IGCloudPubSubPublisherOptions;
  inject?: any[];
}
