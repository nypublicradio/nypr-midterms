import Component from '@ember/component';
import config from '../../config/environment';

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
}];

export default Component.extend({
  tagName: '',

  showNav: config.showNav,

  init() {
    this._super(...arguments);
    this.set('links', LINKS);
  },

  offset() {
    return -this.element.clientHeight;
  }
});
