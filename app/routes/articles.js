import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
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

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('results', model.gothamist.toArray().concat(model.wnyc.toArray()));
  },

});
