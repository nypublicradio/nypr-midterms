import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';

export default Route.extend({
  title(tokens) {
    tokens.unshift('WNYC + Gothamist');
    tokens.unshift('Your Voice Your Choice 2018');
    return tokens.join(' | ');
  },
  actions: {
    didTransition() {
      schedule('afterRender', () => {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'Page View'
          });
        }
      });
    }
  }
})
