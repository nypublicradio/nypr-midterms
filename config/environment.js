'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'nypr-midterms',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/].concat(process.env.HOST_WHITELIST ? process.env.HOST_WHITELIST.split(',') : [])
    },

    gothamistAPI: process.env.GOTHAMIST_API,
    publisherAPI: process.env.PUBLISHER_API,
    optInAPI: process.env.OPT_IN_API,

    mailchimpList: process.env.MAILCHIMP_LIST,
    mobileCommonsOptInKey: process.env.MOBILE_COMMONS_OPT_IN,

    voterGuideIframe: "https://staging.project.wnyc.org/voter-guide-embed/?partner=wnyc",
    primaryResultsIframe: "https://staging.project.wnyc.org/ny-state-primary-2018-results/",

    moment: {
      includeTimezone: 'all'
    },

    // for platform events
    platformEventsAPI: process.env.PLATFORM_EVENTS_API,

    // for utm_source value
    siteSlug: 'midtermshub',

    showNav: process.env.SHOW_NAV,
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.gothamistAPI = 'https://gothamist.com/api';
    ENV.publisherAPI = 'https://nypr.com/api';
    ENV.optInAPI = 'https://optin.com/api';

    ENV.mailchimpList = 'list12345';
    ENV.mobileCommonsOptInKey = 'optin123556'

    // for platform events
    ENV.platformEventsAPI = 'https://platformevents.com/api';
  }

  if (process.env.DEPLOY_TARGET === 'prod') {
    ENV.voterGuideIframe = "https://project.wnyc.org/voter-guide-embed/?partner=wnyc";
    ENV.primaryResultsIframe = "https://project.wnyc.org/ny-state-primary-2018-results/",
  }

  return ENV;
};
