import Route from '@ember/routing/route';
import { inject } from '@ember/service';

const META_DESCRIPTION = "Essential local and national politics coverage from WNYC + Gothamist.";

export default Route.extend({
  titleToken: "News and Analysis",
  head: inject('head-data'),

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  },
});
