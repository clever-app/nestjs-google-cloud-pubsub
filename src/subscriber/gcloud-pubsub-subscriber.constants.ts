export const GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS =
  'GCLOUD_PUBSUB_SUBSCRIBER_MODULE_OPTIONS';

export const GCLOUD_PUBSUB_DEFAULT_RETRY_INTERVAL = 5000;

export const GCLOUD_PUBSUB_DEFAULT_RETRY_CODES = [
  10, // 'ABORTED'
  1, // 'CANCELLED',
  4, // 'DEADLINE_EXCEEDED'
  13, // 'INTERNAL'
  8, // 'RESOURCE_EXHAUSTED'
  14, // 'UNAVAILABLE'
  2, // 'UNKNOWN'
  5, // NOT_FOUND'
  7, // PERMISSION_DENIED
];

export const GCLOUD_PUBSUB_DEFAULT_BACKOFF_SETTINGS = {
  initialRetryDelayMillis: 100,
  retryDelayMultiplier: 1.3,
  maxRetryDelayMillis: 60000,
  initialRpcTimeoutMillis: 12000,
  rpcTimeoutMultiplier: 1.0,
  maxRpcTimeoutMillis: 30000,
  totalTimeoutMillis: 600000,
};

export const GCLOUD_PUBSUB_MESSAGE = 'message';
export const GCLOUD_PUBSUB_ERROR = 'error';
export const GCLOUD_PUBSUB_CLOSE = 'close';
