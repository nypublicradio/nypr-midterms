/* eslint-env node */

/*
  This allows Ember to coexist with other badly-behaved AMD loaders by
  hiding Ember's module loader inside the WNYC_EMBER_LOADER global.
*/

var concat = require('broccoli-concat');
var merge = require('broccoli-merge-trees');

module.exports = {
  name: 'unobtrusive-loader',

  isDevelopingAddon: function() {
    return true;
  },

  postprocessTree: function(type, tree) {
    if(type === 'all' && this.app.env !== 'test') {
      const OUTPUT = [
        'assets/nypr-midterms.js',
        'assets/nypr-midterms-fastboot.js',
        'moment/fastboot-moment.js',
        'ember-fetch/fastboot-fetch.js',
      ];
      return merge([
        tree,
        concat(tree, {
          header: 'var WNYC_EMBER_LOADER=(function(){',
          inputFiles: ['assets/vendor.js'],
          footer: '; return { define:define,require:require,requireModule:requireModule,requirejs:requirejs, runningTests: runningTests };})(); window.require = WNYC_EMBER_LOADER.require;',
          outputFile: 'assets/vendor.js'
        }),
        ...OUTPUT.map(file => {
          return concat(tree, {
            header: '(function(define, require, requireModule, requirejs, runningTests){ ',
            inputFiles: [file],
            footer: '})(WNYC_EMBER_LOADER.define, WNYC_EMBER_LOADER.require, WNYC_EMBER_LOADER.requireModule, WNYC_EMBER_LOADER.requirejs, WNYC_EMBER_LOADER.runningTests);',
            outputFile: file,
          });
        })
      ], { overwrite: true });
    } else {
      return tree;
    }
  }

};
