import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'a',
  classNames: ['share-icon', 'share-icon__email'],
  attributeBindings: ['href', 'target'],

  target: '_blank',
  href: computed('url', 'subject', function() {
    return `mailto:?subject=${this.subject}&body=${this.url}`;
  }),
});
