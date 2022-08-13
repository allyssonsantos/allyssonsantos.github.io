import * as Sentry from '@sentry/gatsby';
import { BrowserTracing } from '@sentry/tracing';

import { version } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
    dsn: process.env.GATSBY_SENTRY_DSN,
    sampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development',
    debug: !isProduction,
    release: version,
    autoSessionTracking: true,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});