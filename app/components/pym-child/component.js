import Component from '@ember/component';
import pym from 'pym';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    if (this.target) {
      new pym.Parent(`${this.elementId}-pym`, this.target);
    }
  },
});
