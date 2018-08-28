import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

const WNYC_QUESTION_TAG = 'news';
const GOTHAMIST_QUESTION_TAG = '@wnyc';

const META_DESCRIPTION = "Do you have a question about how you can make a difference in your neighborhood, city or state? Is there anything you’d like to know about voting, the elections or how to navigate civic life in New York City? Ask us! Our reporters want to help you get involved by answering your questions.";

export default Route.extend({
  titleToken: "Ask a Reporter",

  head: service('head-data'),
  store: service(),

  classNames: ['hearken-route'],

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model({page}) {
    return hash({
      gothamist: this.store.query('gothamist-story', {
        tag: GOTHAMIST_QUESTION_TAG,
        limit: 5,
        page: page || 1
      }),
      wnyc: this.store.query('story', {
        tags: WNYC_QUESTION_TAG,
        page_size: 5,
        page: page || 1,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      })
    });
  },

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  }
});
