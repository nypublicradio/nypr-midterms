import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  urlToShare() {
    let url = encodeURIComponent(`${location}?utm_medium=${this.medium}&utm_campaign=${this.campaign}&utm_source=fb`);
    return `https://www.facebook.com/sharer.php?u=${url}`;
  },

  popup() {
    if (this.open) {
      this.open(this.urlToShare());
    }
  }
});
