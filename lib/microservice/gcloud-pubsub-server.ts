import { Message, PubSub, Subscription } from '@google-cloud/pubsub';
import { Inject } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import {
  GCLOUD_PUBSUB_DEFAULT_RETRY_CODES,
  GCLOUD_PUBSUB_ERROR,
  GCLOUD_PUBSUB_MESSAGE,
  GCLOUD_PUBSUB_MODULE_OPTIONS,
} from '../constants/gcloud-pubsub.constants';
import { IGCloudPubSubOptions } from '../interfaces/gcloud-pubsub-options.interface';

const RETRY_INTERVAL = 5000;

export class GCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  // client Google PubSub
  public client: PubSub = null;

  // tableau des "subscriptions"
  public subscriptions: Subscription[] = [];

  // flag de gestion de l'activité (actif/inactif)
  public isShuttingDown = false;

  constructor(
    @Inject(GCLOUD_PUBSUB_MODULE_OPTIONS)
    private options: IGCloudPubSubOptions
  ) {
    super();
  }

  public listen(callback: () => void) {
    // marquer l
    this.isShuttingDown = false;

    // définir le client
    this.client = new PubSub(this.options.authOptions);

    // pour chaque subscription mettre en place l'écoute avec le handler associé
    this.options.subscriptionIds.forEach((subcriptionName) => {
      // créer une subscription
      const subscription = this.client.subscription(
        subcriptionName,
        this.options.subscriberOptions || {}
      );

      // handler sur le traitement des messages
      const handleMessage = this.handleMessageFactory(subcriptionName);
      subscription.on(GCLOUD_PUBSUB_MESSAGE, handleMessage.bind(this));

      // handler sur le traitement des erreurs
      const handleError = this.handleErrorFactory(
        subscription,
        subcriptionName
      );
      subscription.on(GCLOUD_PUBSUB_ERROR, handleError);

      // ajout de la subscription au tableau
      this.subscriptions.push(subscription);
    });
    callback();
  }

  public handleErrorFactory(
    subscription: Subscription,
    subcriptionName: string
  ) {
    return (error) => {
      this.handleError(error);
      if (
        !this.isShuttingDown &&
        GCLOUD_PUBSUB_DEFAULT_RETRY_CODES.includes(error.code)
      ) {
        this.logger.warn(`Closing subscription: ${subcriptionName}`);
        subscription.close();
        setTimeout(() => {
          this.logger.warn(`Opening subscription: ${subcriptionName}`);
          subscription.open();
        }, RETRY_INTERVAL);
      }
    };
  }

  public close() {
    this.isShuttingDown = true;
    this.subscriptions.forEach((subscription) => {
      subscription.close();
    });
  }

  public handleMessageFactory(subscriptionName: string) {
    return async (message: Message) => {
      const handler = this.getHandlerByPattern(subscriptionName);

      // est-ce qu'il y a un handler ?
      if (!handler) {
        this.logger.warn(`Ack message with no active handler: ${message.id}`);
        message.ack();
        return;
      }
      await handler(message);
    };
  }
}
