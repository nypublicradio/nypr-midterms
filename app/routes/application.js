import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject } from '@ember/service';

export default Route.extend({
  moment:   inject(),
  fastboot: inject(),
  head: inject('head-data'),

  title(tokens) {
    tokens.unshift('2018 Elections');
    tokens.push('WNYC + Gothamist');
    return tokens.join(' | ');
  },

  beforeModel() {
    this.moment.setTimeZone('America/New_York');
  },

  afterModel() {
    let url;
    let protocol;
    let host;

    if (this.fastboot.isFastBoot) {
      ({ protocol, host } = this.fastboot.request);
      let { path } = this.fastboot.request;
      url = `${protocol}//${host}${path}`;
    } else {
      ({ protocol, host } = window.location);
      url = window.location.toString();
    }

    this.head.setProperties({
      url,
      protocol,
      host,
    });
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
