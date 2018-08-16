import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

const PODCAST_FIELDS = 'title,audio,slug,headers,show_title,show,tease,podcast_links';
const WNYC_TAG = 'news';
const GOTHAMIST_TAG = '@wnyc';

export default Route.extend({
  hifi: inject(),
  fastboot: inject(),

  model() {
    return hash({
      gothamist: this.store.query('gothamist-story', {
        tag: GOTHAMIST_TAG,
        limit: 4,
      }),
      wnyc: this.store.query('story', {
        tags: WNYC_TAG,
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
  },

  afterModel({ midtermsEpisode }) {
    if (!this.fastboot.isFastBoot) {
      let {
        audio,
        id
      } = midtermsEpisode;

      // until the midterms audio works
      audio = 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/bl/bl051914bpod.mp3';
      this.hifi.load(audio).then(({ sound }) => {
        this.hifi.set('currentSound', sound);
        this.hifi.set('currentMetadata', {
          contentId: id,
          contentModelType: 'story',
          contentModel: midtermsEpisode,
        })
      });
    }
  }
});
