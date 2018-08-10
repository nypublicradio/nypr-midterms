import Route from '@ember/routing/route';
import { hash } from 'rsvp';

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
      })
    });
  }
});
