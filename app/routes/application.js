import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject } from '@ember/service';

export default Route.extend({
  moment:   inject(),
  fastboot: inject(),

  title(tokens) {
    tokens.unshift('WNYC + Gothamist');
    tokens.unshift('Your Voice Your Choice 2018');
    return tokens.join(' | ');
  },

  beforeModel() {
    this.moment.setTimeZone('America/New_York');
  },

  actions: {
    didTransition() {
      if (!this.fastboot.isFastBoot)  {
        schedule('afterRender', () => {
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'Page View'
            });
          }
          window.scrollTo(0, 0);
        });
      }
    }
  }
})
