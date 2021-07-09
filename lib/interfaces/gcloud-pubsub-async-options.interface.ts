import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IGCloudPubSubOptions } from './gcloud-pubsub-options.interface';
export interface IGCloudPubSubAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<IGCloudPubSubOptions> | IGCloudPubSubOptions;
  inject?: any[];
}
