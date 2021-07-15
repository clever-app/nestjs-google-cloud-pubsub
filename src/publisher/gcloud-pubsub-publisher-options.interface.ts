import { ClientConfig } from '@google-cloud/pubsub';
import { PublishOptions } from '@google-cloud/pubsub/build/src/topic';
import { ModuleOptions } from '../interfaces/gcloud-pubsub-module.interfaces';

export interface IGCloudPubSubPublisherOptions extends ModuleOptions {
  // default topic
  topic?: string;

  // config pour le client PubSub
  clientConfig: ClientConfig;

  // config pour la publication des messages
  publishOptions?: PublishOptions;
}
