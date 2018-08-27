import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { schedule } from '@ember/runloop';

export default Component.extend({
  tagName: '',
  router: inject(),
  scroller: inject(),

  init() {
    this._super(...arguments);
    if (!this.options) {
      this.set('options', {});
    }
  },

  href: computed('route', 'hash', function() {
    let base = `${this.router.urlFor(this.route)}`;
    if (this.hash) {
      return `${base}#${this.hash}`;
    } else {
      return base;
    }
  }),

  updateHash() {
    if (window.history) {
      window.history.replaceState(null, null, `#${this.hash}`);
    } else {
      window.location.hash = this.hash;
    }
  },

  navigate(e) {
    e.preventDefault();
    let transition = this.router.transitionTo(this.route);
    if (this.hash) {
      let hash = `#${this.hash}`;
      let options = {...this.options};
      transition.finally(() => {
        this.updateHash();
        schedule('afterRender', () => {
          if (document.querySelector(hash)) {
            this.scroller.scrollVertical(hash, options)
          }
        })
      });
    }
  }

});
