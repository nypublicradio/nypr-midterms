import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../config/environment';

const META_DESCRIPTION = "WNYC, Gotham Gazette, City Limits and NJ Spotlight analyze key races in this year's New York and New Jersey midterm elections";

export default Route.extend({
  titleToken: "2018 General Election Voter Guide",

  head: service('head-data'),

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('voterGuideIframe', config.voterGuideIframe);
  },
});
