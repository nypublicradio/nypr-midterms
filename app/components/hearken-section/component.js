import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';


export default Component.extend({
  store: service(),
  chunk: null,
  classNames: ['hearken-section'],

  init(){
    this._super(...arguments);
    this._getChunk(this.get('slug1'), "chunk1");
    this._getChunk(this.get('slug2'), "chunk2");
  },

  didRender(){
    var iframe = $('.hearken-submission')[0];
    var iframebody = iframe.contentWindow.document.getElementsByTagName('body')[0];
    if (iframebody.hasChildNodes()){
      return;
    }
    var iframescript = iframe.contentWindow.document.createElement('script');
    iframescript.type = 'text/javascript';
    iframescript.src = 'https://modules.wearehearken.com/wnyc/embed/1770.js'; // replace this with your SCRIPT
    iframebody.appendChild(iframescript);
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

  _loadHearkenScript(){
    let script = '<script src="https://modules.wearehearken.com/wnyc/embed/1770.js"></script>';
    let fragment = document.createRange().createContextualFragment(script);
    let elm = $(".hearken-section__body");
    if(elm.length > 0){
      let temp = requirejs;
      requirejs = undefined;
      elm[0].appendChild(fragment);
      requirejs = temp;
    }

  },

});
