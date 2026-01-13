import type { ConfigType } from '@moneko/core';

const CDNHOST = 'https://h5cdn.dewu.com';
const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: `script-src 'self' ${CDNHOST} 'unsafe-eval' 'unsafe-inline' blob:;`,
      },
      'X-Content-Type-Options': 'nosniff',
      'google-site-verification': 'gmDerloN7NoGvGSeX5M-tWX4SHXJ5XdXvA5bO2oZL5Y',
    },
  },
  performance: false,
};

export default conf;
