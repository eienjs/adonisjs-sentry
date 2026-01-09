import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import { Sentry } from '../sentry.js';

export default class SentryMiddleware {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle(ctx: HttpContext, next: NextFn): Promise<unknown> {
    const activeSpan = Sentry.getActiveSpan();
    const rootSpan = activeSpan && Sentry.getRootSpan(activeSpan);

    if (rootSpan) {
      Sentry.updateSpanName(rootSpan, ctx.routeKey || 'unknown');
    }

    return next();
  }
}
