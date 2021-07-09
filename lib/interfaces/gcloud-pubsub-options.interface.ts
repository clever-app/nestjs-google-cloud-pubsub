import { SubscriberOptions } from '@google-cloud/pubsub/build/src/subscriber';

export interface IGCloudPubSubOptions {
  authOptions: GoogleAuthOptions;
  subscriptionIds: string[];
  subscriberOptions?: SubscriberOptions;
}

export interface GoogleAuthOptions {
  /**
   * Path to a .json, .pem, or .p12 key file
   */
  keyFilename?: string;
  /**
   * Path to a .json, .pem, or .p12 key file
   */
  keyFile?: string;
  /**
   * Object containing client_email and private_key properties, or the
   * external account client options.
   */
  credentials?: CredentialBody;
  /**
   * Required scopes for the desired API request
   */
  scopes?: string | string[];
  /**
   * Your project ID.
   */
  projectId?: string;
}

export interface CredentialBody {
  client_email?: string;
  private_key?: string;
}
