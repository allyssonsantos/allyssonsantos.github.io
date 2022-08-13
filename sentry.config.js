import * as Sentry from '@sentry/gatsby';
import { BrowserTracing } from '@sentry/tracing';

const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development',
    debug: !isProduction,
    release: '0.1.0',
    autoSessionTracking: true,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});