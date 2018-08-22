import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  store: service(),
  classNames: ['paginate-route'],

    model(params) {
      return hash({
        gothamist: this.store.query('gothamist-story', {
          tag: params.gothamisttag,
          page: params.page,
          limit: 10,
        }),
        wnyc: this.store.query('story', {
          tags: params.wnyctag,
          page: params.page,
          page_size: 10,
          ordering: '-newsdate',
          'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
        })
      });
  },
});
