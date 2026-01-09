import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: {
      'index': './index.ts',
      'types': './src/types.ts',
      'sentry_middleware': './src/middleware/sentry_middleware.ts',
      'sentry_provider': './providers/sentry_provider.ts',
      'commands/*': ['./commands/*.ts'],
    },
    outDir: 'build',
    shims: true,
    format: ['esm'],
    target: 'esnext',
    platform: 'node',
    exports: {
      customExports(pkg, _context) {
        pkg['./commands'] = './build/commands/main.js';

        return pkg;
      },
    },
    unbundle: true,
    copy: [
      { from: 'stubs/**/*.stub', to: 'build/stubs', flatten: false },
    ],
  },
]);
