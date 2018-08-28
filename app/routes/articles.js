import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

const META_DESCRIPTION = "Essential local and national politics coverage from WNYC + Gothamist.";

export default Route.extend({
  titleToken: "Election News and Analysis",

  head: inject('head-data'),

  queryParams: {
    page: {
      refreshModel: true
    }
  },
  model({ page = 1}) {
    return hash({
      gothamist: this.store.query('gothamist-story', {
        tag: '@midterms2018',
        count: 10,
        page,
      }),
      wnyc: this.store.query('story', {
        tags: 'midterms2018',
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,appearances,image_main,url,tease,slug,url,headers,show_title'
      })
    });
  },

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('results', model.gothamist.toArray().concat(model.wnyc.toArray()));
  },

});
