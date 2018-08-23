import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

const WNYC_QUESTION_TAG = 'news';
const GOTHAMIST_QUESTION_TAG = '@wnyc';

export default Route.extend({
  store: service(),
  classNames: ['hearken-route'],
  queryParams: {
    page: {
      refreshModel: true
    }
  },


  model({page = 1}) {
    return hash({
      gothamist: this.store.query('gothamist-story', {
        tag: GOTHAMIST_QUESTION_TAG,
        limit: 5,
        page
      }),
      wnyc: this.store.query('story', {
        tags: WNYC_QUESTION_TAG,
        page_size: 5,
        page,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      })
    });
  },
});
