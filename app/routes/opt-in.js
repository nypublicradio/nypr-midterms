import Route from '@ember/routing/route';
import { inject } from '@ember/service';

const META_DESCRIPTION = "WNYC and Gothamist are teaming up to offer essential news and analysis in our new newsletter, the Politics Brief.";

export default Route.extend({
  titleToken: "Get Updates",

  head: inject('head-data'),

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  }
});
