import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

const WNYC_TAG = 'midterms2018';
const GOTHAMIST_TAG = '@midterms2018';

export default Route.extend({
  hifi: inject(),
  fastboot: inject(),

  model() {
    return hash({
      gothamist: this.store.query('gothamist-story', {
        tag: GOTHAMIST_TAG,
        count: 4,
      }),
      wnyc: this.store.query('story', {
        tags: WNYC_TAG,
        page_size: 4,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      }),
      politicsBrief: this.store.findRecord('show', 'politicsbrief'),
      morePerfect: this.store.findRecord('show', 'radiolabmoreperfect'),
    });
  },
});
