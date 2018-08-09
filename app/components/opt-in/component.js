import Component from '@ember/component';
import { validate } from 'ember-validators';
import { computed } from '@ember/object';

export default Component.extend({
  init() {
    this._super(...arguments)
  },
  optinEmail: null,
  optinPhone: null,
  optinEmailValid: computed('optinEmail', function() {
    return validate('format', this.get('optinEmail'), {type: 'email', message: 'asodifj'})
  }),
  optinPhoneValid: computed('optinPhone', function() {
    return validate('format', this.get('optinPhone'), {type: 'phone'})
  })
});
