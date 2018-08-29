import Component from '@ember/component';
import { get, set, getWithDefault } from '@ember/object';
import { observer, computed } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  classNames: ['load-more'],
  hasLoadedWNYC: false,
  hasLoadedGoth: false,
  hasLoaded: false,
  hasMoreWNYC: true,
  hasMoreGoth: true,
  hasMore: computed('hasMoreWNYC', 'hasMoreGoth', function() {
    return get(this, 'hasMoreWNYC') || get(this, 'hasMoreGoth');
  }),
  hasLoadedChanged: observer('hasLoadedWNYC', 'hasLoadedGoth', function() {
    set(this, 'hasLoaded', get(this, 'hasLoadedWNYC') && get(this, 'hasLoadedGoth'));
  }),
  setItems: observer('hasLoaded', function() {
    // get all the unshown items, add the two lists together and sort by publish date.
    // take the 10 most recently published. The last story establishes the publish cutoff date.
    // Add these 10 stories to the master list: 'items'.
    if (this.get('hasLoaded')){
      let wNYCUnshown = this.get('wNYCItems').slice(this.get('wNYCCairn'));
      let gothUnshown = this.get('gothItems').slice(this.get('gothCairn'));
      let unshown =  wNYCUnshown.concat(gothUnshown).sort((a, b) => moment(b.newsdate) - moment(a.newsdate));
      this.get('items').pushObjects(unshown.toArray().slice(0, this.get('pageSize')));
      this.adjustCairns(this.get('items.lastObject'), wNYCUnshown, gothUnshown);
    }
  }),

  init() {
    set(this, 'pageSize',  getWithDefault(this, 'pageSize', 10));
    this.resetState();
    this.on('didUpdateAttrs', this.resetState);
    this._super(...arguments);
  },

  resetState() {
    this.set('page', 0);
    this.set('pageGoth',  1);
    this.set('pageWNYC',  1);
    this.set('items', []);
    this.set('wNYCItems', []);
    this.set('gothItems', []);
    this.set('gothCairn', 0); // markers to remember the first stories in the
    this.set('wNYCCairn', 0); // respective lists that missed the cutoff in the master list
    this.send('fetchData');
  },


  adjustCairns(lastStory, wNYCUnshown, gothUnshown){
    // gets the lists of WNYC and Goth stories that were just loaded and which
    // are among the 10 most recently published (meaning they will be shown on the page).
    // Then take the length of the list and add it to the cairn counters to keep track
    // of how many wnyc and goth stories are being shown currently. This allows the
    // component to load more stories from wnyc or goth only if needed.
    let wNYCShown = wNYCUnshown.filter(item => moment(item.newsdate).isSameOrAfter(lastStory.newsdate));
    let gothShown = gothUnshown.filter(item => moment(item.newsdate).isSameOrAfter(lastStory.newsdate));
    if (wNYCShown) this.set('wNYCCairn', this.get('wNYCCairn') + wNYCShown.length);
    if (gothShown) this.set('gothCairn', this.get('gothCairn') + gothShown.length);
  },

  actions: {
    fetchData() {
      // if there are no more stores from wnyc and gothamist, hasMore will be set to
      // false, and the load more button will dissapear. But in the case where there
      // are more stories from one place but not the other, we want to allow more stories
      // to be loaded from just the one place. We also want to only load from one place
      // if none of the stories from the first of the places made the publish date cutoff.
      // In this case we would load only from the second place.
      this.incrementProperty('page');
      let pageSize = this.get('pageSize');
      let pageWNYC = this.get('pageWNYC');
      let pageGoth = this.get('pageGoth');
      if(this.get('hasMoreGoth') &&
        ((this.get('gothItems').length - this.get('gothCairn')) < 10)){
        this.set('hasLoadedGoth', false);
        this.store.query('gothamist-story', {
          tag: this.get('gothTag'),
          count: pageSize,
          page: pageGoth,
        }).then(results => {
          return this.send('processResultsGoth', results);
        }).finally(() => {
          set(this, 'hasLoadedGoth', true);
        });
      }
      if(get(this, 'hasMoreWNYC') &&
        ((this.get('wNYCItems').length - this.get('wNYCCairn')) < 10)){
        this.set('hasLoadedWNYC', false);
        this.store.query('story', {
          tags: this.get('wNYCTag'),
          page_size: pageSize,
          page: pageWNYC,
          ordering: '-newsdate',
          'fields[story]': 'title,newsdate,producing_organizations,appearances,image_main,url,tease,slug,url,headers,show_title'
        }).then(results => {
          return this.send('processResultsWNYC', results);
        }).finally(() => {
          set(this, 'hasLoadedWNYC', true)
        });
      }
    },

    processResultsWNYC(results) {
      get(this, 'wNYCItems').pushObjects(results.toArray());
      this.set('hasMoreWNYC', (get(results, 'meta.pagination.count') > get(this, 'wNYCItems.length')));
      if (this.get('hasMoreWNYC')) {
        this.incrementProperty('pageWNYC');
      }
    },

    processResultsGoth(results) {
      get(this, 'gothItems').pushObjects(results.toArray());
      this.set('hasMoreGoth', (get(results, 'meta.total_entries') > get(this, 'gothItems.length')));
      if (this.get('hasMoreGoth')) {
        this.incrementProperty('pageGoth');
      }
    },
  }

});
