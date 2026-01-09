import type { CommandOptions } from '@adonisjs/core/types/ace';
import type { SentryConfig } from '../src/types.js';
import { BaseCommand } from '@adonisjs/core/ace';

export default class VerifySentryIntegration extends BaseCommand {
  public static readonly commandName = 'sentry:verify';

  public static readonly description = 'Generate a test event and send it to Sentry';

  public static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  };

  public async run(): Promise<void> {
    const config = await this.app.container.make('config');
    const sentryConfig = config.get<SentryConfig>('sentry');

    if (!sentryConfig.enabled) {
      this.logger.info('Sentry is disabled');

      return;
    }

    const { Sentry } = await import('../src/sentry.js');
    if (!Sentry.isInitialized()) {
      Sentry.init(sentryConfig);
    }

    try {
      throw new Error('This is a test exception sent from the sentry adonisjs');
    } catch (error) {
      const eventId = Sentry.captureException(error);
      this.logger.success(`Event sent with ID: ${eventId}`);
    }
  }
}
