import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { schedule, bind } from '@ember/runloop';

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

  complete() {
    if (window.history) {
      window.history.replaceState(null, null, `#${this.hash}`);
    } else {
      window.location.hash = this.hash;
    }
    if (this.options.complete) {
      this.options.complete();
    }
  },

  navigate() {
    let transition = this.router.transitionTo(this.route);
    if (this.hash) {
      let options = {...this.options};
      transition.finally(() => {
        schedule('afterRender', () => {
          this.scroller.scrollVertical(`#${this.hash}`, options)
            .then(bind(this, 'complete'));
        })
      });
    }
  }

});
