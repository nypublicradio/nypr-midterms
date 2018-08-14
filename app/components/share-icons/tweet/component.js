import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  urlToShare: computed('url', 'via', 'text', 'medium', 'campaign', function() {
    let url = encodeURIComponent(`${this.url}?utm_medium=${this.medium}&utm_campaign=${this.campaign}&utm_source=tw`);
    let params = `text=${this.text}&url=${url}`;
    params = this.via ? `${params}&via=${this.via}` : params;
    return `https://twitter.com/intent/tweet?${params}`;
  }),

  open() {} // isolated test compat
});
