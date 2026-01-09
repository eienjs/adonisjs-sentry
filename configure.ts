import type ConfigureCommand from '@adonisjs/core/commands/configure';
import { stubsRoot } from './stubs/main.js';

export async function configure(command: ConfigureCommand): Promise<void> {
  const codemods = await command.createCodemods();

  await codemods.makeUsingStub(stubsRoot, 'config.stub', {});

  await codemods.defineEnvVariables({
    SENTRY_DSN: '<your_dsn_url>',
  });

  await codemods.defineEnvValidations({
    variables: {
      SENTRY_DSN: 'Env.schema.string()',
    },
    leadingComment: 'Variables for configuring @eienjs/adonisjs-sentry package',
  });

  await codemods.registerMiddleware('router', [{
    path: '@eienjs/adonisjs-sentry/sentry_middleware',
    position: 'before',
  }]);

  await codemods.updateRcFile((rcFile) => {
    rcFile.addCommand('@eienjs/adonisjs-sentry/commands');
    rcFile.addProvider('@eienjs/adonisjs-sentry/sentry_provider');
  });
}
