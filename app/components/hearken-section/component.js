import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';


export default Component.extend({
  store: service(),
  fastboot: service(),
  classNames: ['hearken-section'],

  init(){
    this._super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this._getChunk(this.get('slug'), "chunk");
    }
  },

  _renderHearkenScript(){
    var div = $('.hearken-section__chunk-wrapper')[0];
    if (div.hasChildNodes() || !this.get('chunk')){
      return;
    } else {
      let fragment = document.createRange().createContextualFragment(this.get('chunk').content);
      div.appendChild(fragment);
    }
  },

  _getChunk(slug, chunkName) {
    this.get('store').findRecord('chunk', slug).then((chunk) => {

      // because this is async you need to guard against the component
      // being destroyed before the api call has finished because
      // because `this.set` will throw an error.
      if (this.isDestroyed) { return; }

      this.set(chunkName, chunk);
      this._renderHearkenScript();
    })
  },
});
