import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('resultsIframe', config.resultsIframe);
  },
});
