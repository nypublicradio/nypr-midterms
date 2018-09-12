import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../config/environment';

const META_DESCRIPTION = "WNYC, Gotham Gazette and City Limits analyze key races in this year’s New York State primary election";

export default Route.extend({
  titleToken: "Primary Voter Guide",

  head: service('head-data'),

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('voterGuideIframe', config.voterGuideIframe);
  },
});
