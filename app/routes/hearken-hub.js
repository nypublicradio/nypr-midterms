import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  store: service(),
  classNames: ['hearken-route'],

  model() {
    return hash({
      chunk: this.store.findRecord('chunk', 'midterms-hearken-chunk-1'),
    });
  },
});
