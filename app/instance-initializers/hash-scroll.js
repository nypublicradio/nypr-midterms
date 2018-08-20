import { schedule } from '@ember/runloop';

export function initialize(appInstance) {
  if (typeof location !== 'undefined' && location.hash) {
    if (document.querySelector(location.hash)) {
      let scroll = appInstance.lookup('service:scroller');
      let options = {offset: -100};
      schedule('afterRender', () => scroll.scrollVertical(location.hash, options));
    }
  }
}

export default {
  initialize
};
