import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  urlToShare: computed('url', 'medium', 'campaign', function() {
    let url = encodeURIComponent(`${this.url}?utm_medium=${this.medium}&utm_campaign=${this.campaign}&utm_source=fb`);
    return `https://www.facebook.com/sharer.php?u=${url}`;
  }),

  open() {} // isolated test compat
});
