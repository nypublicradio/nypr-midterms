import Component from '@ember/component';

export default Component.extend({
  tagName: 'h1',
  classNames: ['episode-tease__title']
}).reopenClass({
  positionalParams: ['text']
});
