import { schedule } from '@ember/runloop';

export function initialize(appInstance) {
  if (typeof location !== 'undefined' && location.hash) {
    if (document.querySelector(location.hash)) { // don't scroll to an ID if it doesn't exist
      let scroll = appInstance.lookup('service:scroller');
      let options = {offset: -100};
      schedule('afterRender', () => scroll.scrollVertical(location.hash, options));
    }
  }
}

export default {
  initialize
};
