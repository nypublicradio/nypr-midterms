import Component from '@ember/component';
import { inject } from '@ember/service';
import { scheduleOnce, bind, throttle } from '@ember/runloop';

export default Component.extend({
  router: inject(),

  tagName: 'nav',
  links: null,
  activeTabIndex: 0,
  classNames: ['nav-links'],
  classNameBindings: ['xScrollable'],

  didReceiveAttrs() {
    this._super(...arguments);
    let links = this.get('links');
    if (!links) {
      return;
    }

    let router = this.get('router');
    let defaultIndex = links.indexOf(links.find(link => router.isActive(link.route)));
    this.set('activeTabIndex', defaultIndex === -1 ? 0 : defaultIndex);
  },

  didRender() {
    throttle(this, 'scroll', 10);
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'handleResize');

    // so we can explicitly remove this at destroy-time
    this.set('boundResizeHandler', bind(this, 'handleResize'));
    window.addEventListener('resize', this.get('boundResizeHandler'), false);
  },

  willDestroyElement() {
   window.removeEventListener('resize', this.get('boundResizeHandler'));
  },

  scroll() {
    if (this.get('activeTabIndex') !== 0) {
      let y =  this.element.offsetTop - (this.element.offsetHeight + 100);
      window.scrollTo(0, y);
    }
  },

  handleResize() {
    let el = this.element;
    let elPadding = parseInt(getComputedStyle(el).paddingRight, 10) + parseInt(getComputedStyle(el).paddingLeft, 10);
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

  actions: {
    moveBar(index, route) {
      if (route) {
        this.set('activeTabIndex', index);
      }
    }
  }
});
