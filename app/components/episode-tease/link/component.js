import Component from '@ember/component';

export default Component.extend({
  tagName: 'a',
  classNames: ['episode-tease__link'],
  attributeBindings: ['href', 'target'],
}).reopenClass({
  positionalParams: ['text', 'href'],
});
