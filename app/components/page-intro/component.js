import Component from '@ember/component';

const LINKS = [{
  route: 'opt-in',
  text: 'Get Updates',
}, {
  route: 'hearken-hub',
  text: 'Ask a Reporter',
}, {
  route: 'articles',
  text: 'News'
}, {
  route: 'index',
  hash: 'podcasts',
  text: 'Podasts',
}, {
  route: 'index',
  hash: 'guide',
  text: 'Voter Tools'
}];

export default Component.extend({
  tagName: '',

  init() {
    this._super(...arguments);
    this.set('links', LINKS);
  },
});
