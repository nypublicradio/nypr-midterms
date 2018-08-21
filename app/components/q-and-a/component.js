import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  chunk: null,
  classNames: ['hearken-q-and-a'],

  init(){
    this._super(...arguments);
    this._getChunk(this.get('slug'), "chunk");
  },

  _getChunk(slug, chunkName) {
    this.get('store').findRecord('chunk', slug).then((chunk) => {

      // because this is async you need to guard against the component
      // being destroyed before the api call has finished because
      // because `this.set` will throw an error.
      if (this.isDestroyed) { return; }

      this.set(chunkName, chunk);
    })
  },
});
