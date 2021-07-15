import { ClientConfig } from '@google-cloud/pubsub';
import { SubscriberOptions } from '@google-cloud/pubsub/build/src/subscriber';
import { ModuleOptions } from '../interfaces/gcloud-pubsub-module.interfaces';

export interface IGCloudPubSubSubscriberOptions extends ModuleOptions {
  clientConfig: ClientConfig;
  subscriptionIds: string[];
  subscriberOptions?: SubscriberOptions;
}
