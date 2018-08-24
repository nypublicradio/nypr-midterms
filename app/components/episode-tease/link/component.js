import Component from '@ember/component';

export default Component.extend({
  classNames: ['episode-tease__link'],
  classNameBindings: ['noMargin'],
}).reopenClass({
  positionalParams: ['text', 'href'],
});
