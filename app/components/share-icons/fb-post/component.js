import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  urlToShare: computed('url', function() {
    return `https://www.facebook.com/sharer.php?u=${this.url}`;
  }),

  open() {} // isolated test compat
});
