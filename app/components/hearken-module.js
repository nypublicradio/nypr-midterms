import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
  store: service(),
  chunk: null,

  init(){
    this._super(...arguments);
    console.log(this.get('slug'))
    this._getChunk();
  },

  _getChunk() {
    this.get('store').findRecord('chunk', this.get('slug')).then((chunk) => {

      // because this is async you need to guard against the component
      // being destroyed before the api call has finished because
      // because `this.set` will throw an error.
      if (this.isDestroyed) { return; }

      this.set('chunk', chunk);
      console.log(this.get('chunk'));
    })
  }
});
