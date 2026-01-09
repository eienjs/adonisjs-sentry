import type { SentryConfig } from './types.js';
import { RuntimeException } from '@adonisjs/core/exceptions';

export function defineConfig(config: SentryConfig): SentryConfig {
  if (!config.environment) {
    throw new RuntimeException('Missing "environment" property in sentry config');
  }

  return config;
}
