import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  urlToShare: function() {
    let url = encodeURIComponent(`${location}?utm_medium=${this.medium}&utm_campaign=${this.campaign}&utm_source=tw`);
    let params = `text=${this.text || document.title}&url=${url}`;
    params = this.via ? `${params}&via=${this.via}` : params;
    return `https://twitter.com/intent/tweet?${params}`;
  },

  popup() {
    if (this.open) {
      this.open(this.urlToShare());
    }
  }
});
