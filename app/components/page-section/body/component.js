import Component from '@ember/component';

export default Component.extend({
  classNames: ['page-section__body'],
  classNameBindings: ['isOpen:is-open:is-closed']
});
