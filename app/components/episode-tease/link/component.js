import Component from '@ember/component';
import { reads } from '@ember/object/computed';

export default Component.extend({
  classNames: ['episode-tease__link'],
  classNameBindings: ['noMargin'],

  'data-test-selector': reads('text'),
}).reopenClass({
  positionalParams: ['text', 'href'],
});
