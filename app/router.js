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
  this.route('articles', {path: 'news'});
  this.route('hearken-hub', {path: 'ask-a-reporter'});

  this.route('missing', {path: '*'});
  this.route('voter-guide');
});

export default Router;
