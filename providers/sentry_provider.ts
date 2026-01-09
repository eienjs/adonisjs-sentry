import type { ApplicationService } from '@adonisjs/core/types';
import type { SentryConfig } from '../src/types.js';

export default class SentryProvider {
  public constructor(protected app: ApplicationService) {}

  public async boot(): Promise<void> {
    const config = this.app.config.get<SentryConfig>('sentry', {});

    if (config.enabled) {
      const { Sentry } = await import('../src/sentry.js');

      Sentry.init(config);
    }
  }
}
