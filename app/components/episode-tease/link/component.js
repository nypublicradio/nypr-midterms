import Component from '@ember/component';

export default Component.extend({
  classNames: ['episode-tease__link'],
}).reopenClass({
  positionalParams: ['text', 'href'],
});
