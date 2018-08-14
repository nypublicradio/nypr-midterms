import Route from '@ember/routing/route';
import { hash } from 'rsvp';

const PODCAST_FIELDS = 'title,audio,slug,showTitle,show,tease,podcast_links';

export default Route.extend({
  model() {
    return hash({
      gothamist: this.store.query('gothamist-story', {
        tag: '@wnyc',
        limit: 4,
      }),
      wnyc: this.store.query('story', {
        tags: 'news',
        page_size: 4,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      }),
      midtermsEpisode: this.store.query('story', {
        show: 'midterms',
        page_size: 1,
        ordering: '-newsdate',
        'fields[story]': PODCAST_FIELDS,
      }).then(all => all.firstObject),
      morePerfectEpisode: this.store.query('story', {
        show: 'radiolabmoreperfect',
        page_size: 1,
        ordering: '-newsdate',
        'fields[story]': PODCAST_FIELDS,
      }).then(all => all.firstObject),
    });
  }
});
