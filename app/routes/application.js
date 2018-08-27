import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject } from '@ember/service';

export default Route.extend({
  moment:   inject(),
  fastboot: inject(),
  head: inject('head-data'),

  title(tokens) {
    tokens.unshift('2018 Elections');
    return tokens.join(' | ');
  },

  beforeModel() {
    this.moment.setTimeZone('America/New_York');
  },

  afterModel() {
    let url;

    if (this.fastboot.isFastBoot) {
      let { protocol, host, path } = this.fastboot.request;
      url = `${protocol}//${host}${path}`;
    } else {
      url = window.location.toString();
    }

    this.head.set('url', url);
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
