import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

const WNYC_TAG = 'midterms2018';
const GOTHAMIST_TAG = '@midterms2018';
const STORY_FIELDS = 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease,show_title';

const META_DESCRIPTION = "Essential election coverage from WNYC + Gothamist";

export default Route.extend({
  hifi: inject(),
  fastboot: inject(),
  head: inject('head-data'),

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
        'fields[story]': STORY_FIELDS,
      }),
      politicsBrief: this.store.findRecord('show', 'politicsbrief'),
      morePerfect: this.store.findRecord('show', 'radiolabmoreperfect'),
      americaLine: this.store.findRecord('show', 'america-line'),
      usAnxiety: this.store.findRecord('show', 'anxiety'),
      thirtyIssues: this.store.findRecord('channel', 'series/30-issues-30-days').then(series => {
        series.set('image', series.logoImage);
        return series;
      }),
    });
  },

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  },

});
