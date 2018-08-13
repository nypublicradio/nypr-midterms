import Component from '@ember/component';
import { not } from '@ember/object/computed';

export default Component.extend({
  classNames: ['page-section'],
  classNameBindings: ['isOpen:is-open:is-closed'],

  isClosed: not('isOpen'),

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.open !== undefined) {
      this.set('isOpen', this.open);
    }
  },

  toggleOpen() {
    this.toggleProperty('isOpen');
  }
});
