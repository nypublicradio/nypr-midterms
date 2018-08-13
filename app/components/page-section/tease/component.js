import Component from '@ember/component';

export default Component.extend({
  classNames: ['page-section__tease'],
  classNameBindings: ['isOpen:is-open:is-closed', 'gradient']
});
