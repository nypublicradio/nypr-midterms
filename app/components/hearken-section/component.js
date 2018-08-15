import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
  store: service(),
  chunk: null,
  classNames: ['hearken-section'],

  init(){
    this._super(...arguments);
    this._getChunk(this.get('slug1'), "chunk1");
    this._getChunk(this.get('slug2'), "chunk2");
  },

  _getChunk(slug, chunkName) {
    this.get('store').findRecord('chunk', slug).then((chunk) => {

      // because this is async you need to guard against the component
      // being destroyed before the api call has finished because
      // because `this.set` will throw an error.
      if (this.isDestroyed) { return; }

      this.set(chunkName, chunk);
    })
  }
});
