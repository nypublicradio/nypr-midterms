import EmberRouter from '@ember/routing/router';
import { inject } from '@ember/service';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  headData: inject(),

  setTitle(title) {
    this.headData.set('title', title);
  }
});

Router.map(function() {
  this.route('opt-in');
  this.route('articles');
});

export default Router;
