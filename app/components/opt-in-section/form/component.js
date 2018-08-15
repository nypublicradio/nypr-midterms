import Component from '@ember/component';
import { bind } from '@ember/runloop';
import { computed } from '@ember/object';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Component.extend({
  tagName: 'form',
  classNames: ['opt-in-form'],
  classNameBindings: ['isLoading', 'name'],

  isLoading: false,
  submitError: null,

  init() {
    this._super(...arguments);
    this.set('form', {});
    this.set('changeset', new Changeset(this.form, lookupValidator(this.validations), this.validations, {skipValidate: true}));
  },

  disableSubmit: computed('changeset.{legal,errors.[]}', 'isLoading', function() {
    if (this.isLoading || !this.changeset.get('legal') || this.changeset.get('errors.length')) {
      return true;
    } else {
      return false;
    }
  }),

  submit(e) {
    e.preventDefault();
  },

  validate(changeset, property) {
    this.set('submitError', null);
    changeset.validate(property);
  },

  handleSuccess() {
    this.set('isLoading', false);
    this.onSuccess();
  },

  handleError({ detail }) {
    this.set('isLoading', false);
    this.set('submitError', detail);
  },

  actions: {
    submit(changeset) {
      changeset.validate()
        .then(() => {
          if (changeset.get('isValid') && this.submit) {
            this.set('isLoading', true);
            this.submit(changeset.get(this.name))
              .then(bind(this, 'handleSuccess'))
              .catch(bind(this, 'handleError'));
          }
        })
    }
  }
});
