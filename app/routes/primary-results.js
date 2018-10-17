import Route from '@ember/routing/route';
import config from '../config/environment';
import { inject as service } from '@ember/service';

const META_DESCRIPTION = "WNYC, Gotham Gazette and City Limits analyze key races in this year’s New York State primary election";

export default Route.extend({
  titleToken: "Primary Results",

  head: service('head-data'),

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('primaryResultsIframe', config.primaryResultsIframe);
  },
});
