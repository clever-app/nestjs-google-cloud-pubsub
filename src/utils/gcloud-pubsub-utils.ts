import { PubSub } from '@google-cloud/pubsub';
import { Logger } from '@nestjs/common';

export class GCloudPubSubUtils {
  private static readonly logger = new Logger(GCloudPubSubUtils.name);

  static async initSubscription(
    pubsub: PubSub,
    topicName: string,
    subscriptionName: string
  ): Promise<void> {
    // vérifier les données entrantes
    if (!pubsub) {
      throw new Error(`Gcloud Pub/Sub client not initialized.`);
    }

    if (!topicName) {
      throw new Error(
        `Gcloud Pub/Sub failed to init subscription, because topic name specified is undefined.`
      );
    }

    if (!subscriptionName) {
      throw new Error(
        `Gcloud Pub/Sub failed to init subscription, because subscription name specified is undefined.`
      );
    }

    // pointer sur le topic
    const topic = pubsub.topic(topicName);
    // est-ce que le topic exsite ?
    if (!(await topic.exists())[0]) {
      throw new Error(`Gcloud Pub/Sub topic not found: '${topicName}'`);
    }

    // pointer sur l'abonnement associé au topic
    const subscription = topic.subscription(subscriptionName);
    // est-ce que l'abonnement existe ?
    if (!(await subscription.exists())[0]) {
      // créer l'abonnement
      await subscription.create();
      this.logger.log(
        `GCloud Pub/Sub subscription created: '${subscriptionName}'`
      );
    }
  }
}
