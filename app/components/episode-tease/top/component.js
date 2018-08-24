import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['episode-tease__top'],
  attributeBindings: ['style'],

  style: computed('bg', function() {
    if (!this.bg) {
      return htmlSafe('');
    }

    return htmlSafe(`background-image: url(${this.bg});`);
  }),
});
