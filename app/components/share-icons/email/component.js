import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  urlToShare() {
    let url = encodeURIComponent(`${location}?utm_medium=${this.medium}&utm_campaign=${this.campaign}`);
    return `mailto:?subject=${this.subject || document.title}&body=${url}`;
  },

  popup() {
    if (this.open) {
      this.open(this.urlToShare());
    }
  }
});
