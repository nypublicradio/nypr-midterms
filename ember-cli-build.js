'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/include-media/dist',
      ]
    },
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    useWaypoints: true
  });

  app.import('node_modules/normalize.css/normalize.css');
  app.import({
    development: 'node_modules/pym.js/dist/pym.v1.js',
    production: 'node_modules/pym.js/dist/pym.v1.min.js',
  }, {
    using: [
      {transformation: 'amd', as: 'pym'}
    ]
  });

  return app.toTree();
};
