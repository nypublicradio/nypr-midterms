import Component from '@ember/component';
import { inject } from '@ember/service';
import { scheduleOnce, bind } from '@ember/runloop';

export default Component.extend({
  router: inject(),

  tagName: 'nav',
  links: null,
  activeTabIndex: 0,
  classNames: ['nav-links'],
  classNameBindings: ['xScrollable'],

  init() {
    this._super(...arguments);
    this.router._router.on('didTransition', () => {
      scheduleOnce('afterRender', () => {
        let currentRoute = this.router.currentRouteName;
        if (currentRoute === 'index' && !location.hash) {
          this.set('activeTabIndex', 0);
        } else if (this.links) {
          let index = this.findLinkIndex();
          this.set('activeTabIndex', index);
        }
      });
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);
    let links = this.links;
    if (!links || typeof FastBoot !== 'undefined') {
      return;
    }

    let index = this.findLinkIndex();
    this.set('activeTabIndex', index === -1 ? 0 : index);
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'handleResize');

    // so we can explicitly remove this at destroy-time
    this.set('boundResizeHandler', bind(this, 'handleResize'));
    window.addEventListener('resize', this.boundResizeHandler, false);
  },

  willDestroyElement() {
   window.removeEventListener('resize', this.boundResizeHandler);
  },

  handleResize() {
    let el = this.element;
    let linkWrapper = el.querySelector('.nav-links__list');
    let elPadding = parseInt(getComputedStyle(linkWrapper).paddingRight, 10) + parseInt(getComputedStyle(linkWrapper).paddingLeft, 10);
    let elContent = this.element.scrollWidth - elPadding;

    try {
      let list = Array.from(el.querySelectorAll('.nav-links__list-item'));
      let listWidth = list
        .map(n => n.getBoundingClientRect().width + parseInt(getComputedStyle(n).marginRight, 10))
        .reduce((a, b) => a + b, 0);

      if (listWidth > elContent) {
        this.set('xScrollable', true);
      } else {
        this.set('xScrollable', false);
      }
    } catch(e) {
      this.set('xScrollable', false);
    }
  },

  findLinkIndex() {
    let { router, links } = this;
    if (location.hash) {
      return links.indexOf(links.find(link => link.hash === location.hash.slice(1) && router.isActive(link.route)));
    } else {
      return links.indexOf(links.filter(link => !link.hash).find(link => router.isActive(link.route)));
    }
  },

  moveBar(index) {
    this.set('activeTabIndex', index);
  }
});
