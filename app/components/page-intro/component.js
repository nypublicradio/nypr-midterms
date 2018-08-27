import Component from '@ember/component';

const LINKS = [{
  route: 'index',
  text: 'Main',
  hash: 'top',
}, {
  route: 'hearken-hub',
  text: 'Ask a Reporter',
}, {
  route: 'opt-in',
  text: 'Newsletter',
}, {
  route: 'articles',
  text: 'News'
}, {
  route: 'index',
  hash: 'podcasts',
  text: 'Podcasts',
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
