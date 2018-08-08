import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  urlToShare: computed('url', 'via', 'text', function() {
    let params = `text=${this.text}&url=${this.url}`;
    params = this.via ? `${params}&via=${this.via}` : params;
    return `https://twitter.com/intent/tweet?${params}`;
  }),

  open() {} // isolated test compat
});
