import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  classNames: ['updates-section__form'],

  init() {
    this._super(...arguments);
    this.set('form', {});
  },

  submit(e) {
    e.preventDefault();
  },

  validate(changeset, property) {
    changeset.validate(property);
  },

  actions: {
    submit(changeset) {
      changeset.validate()
        .then(() => {
          if (changeset.get('isValid') && this.submit) {
            this.set('isLoading', true);
            this.submit(changeset.get(this.name))
              .then(() => this.set('isLoading', false))
              .then(this.onSuccess)
              .catch(e => this.set('error', e));
          }
        })
    }
  }
});
