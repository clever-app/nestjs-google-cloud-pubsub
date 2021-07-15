import { PubSub } from '@google-cloud/pubsub';
import { PublishOptions } from '@google-cloud/pubsub/build/src/topic';
import { Inject, Injectable } from '@nestjs/common';
import { IGCloudPubSubPublisherOptions } from './gcloud-pubsub-publisher-options.interface';
import {
  ERROR_TOPIC_NOT_FOUND,
  GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS,
} from './gcloud-pubsub-publisher.constants';

@Injectable()
export class GCloudPubSubPublisher {
  // client Google PubSub
  public client: PubSub = null;

  constructor(
    @Inject(GCLOUD_PUBSUB_PUBLISHER_MODULE_OPTIONS)
    private readonly options: IGCloudPubSubPublisherOptions
  ) {
    this.client = new PubSub(options.clientConfig);
  }

  public publishMessage(
    topic: string,
    data: string | Uint8Array | number[] | ArrayBuffer | SharedArrayBuffer,
    attributes: { [key: string]: string } = {},
    encoding?: BufferEncoding
  ): Promise<string> {
    let dataBuffer: Buffer = undefined;
    if (typeof data === 'string' && encoding) {
      dataBuffer = Buffer.from(data as string, encoding);
    } else if (Array.isArray(data)) {
      dataBuffer = Buffer.from(data as number[]);
    } else if (data instanceof ArrayBuffer) {
      dataBuffer = Buffer.from(data as ArrayBuffer);
    } else if (data instanceof SharedArrayBuffer) {
      dataBuffer = Buffer.from(data as SharedArrayBuffer);
    } else if (data instanceof Uint8Array) {
      dataBuffer = Buffer.from(data as Uint8Array);
    } else {
      dataBuffer = Buffer.from(data as string);
    }
    return this.client
      .topic(topic, this.options.publishOptions)
      .publish(dataBuffer, attributes);
  }

  public async publish(
    message: any,
    options?: PublishOptions & { topic?: string }
  ): Promise<string> {
    // determiner le topic à utiliser (par défaut ou celui spécifié)
    const topicName = this.getTopicName(options);

    // intialiser un objet topic
    const topic = this.client.topic(
      topicName,
      Object.assign({}, this.options.publishOptions, options)
    );

    // publier le message et retourner le "messageId"
    return await topic.publishJSON(message, {});
  }

  private getTopicName(options?: { topic?: string }): string {
    const topic = this.options.topic || options?.topic;
    if (!topic) {
      throw new Error(ERROR_TOPIC_NOT_FOUND);
    }
    return topic;
  }
}
