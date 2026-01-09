import type { NodeOptions } from '@sentry/node';

export interface SentryConfig extends NodeOptions {
  /**
   * Enable or disable Sentry
   */
  enabled: boolean;

  dsn: string;
}
