import Component from '@ember/component';
import { animate } from 'liquid-fire';

import Waypoint from 'waypoints';

export default Component.extend({
  tagName: 'section',
  classNames: ['race-group'],

  didInsertElement() {
    this._super(...arguments);
    this.waypoint = new Waypoint.Sticky({
      element: this.element,
      wrapper: '<div class="race-group-stuck" />',
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.waypoint.destroy();
  },

  actions: {
    toTop() {
      let title = document.getElementById('results-title');
      let offsetTop = title ? title.offsetTop : 0;
      animate([document.body], 'scroll', {offset: offsetTop - 125});
    }
  }
});
