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
    // append the sorted list onto the master list.
    if (this.get('hasLoaded')){
      let wNYCUnshown = this.get('wNYCItems').slice((this.get('page') - 1) * this.get('pageSize'));
      let gothUnshown = this.get('gothItems').slice((this.get('page') - 1) * this.get('pageSize'));
      let unshown =  wNYCUnshown.concat(gothUnshown).sort((a, b) => moment(b.newsdate) - moment(a.newsdate));
      this.get('items').pushObjects(unshown.toArray().slice(0, this.get('pageSize') * 2));
    }
  }),

  init() {
    set(this, 'pageSize',  getWithDefault(this, 'pageSize', 5));
    this.resetState();
    this.on('didUpdateAttrs', this.resetState);
    this._super(...arguments);
  },

  resetState() {
    this.set('page', 0);
    this.set('items', []);
    this.set('wNYCItems', []);
    this.set('gothItems', []);
    this.send('fetchData');
  },

  actions: {
    fetchData() {
      // if there are no more stores from wnyc and gothamist, hasMore will be set to
      // false, and the load more button will dissapear. But in the case where there
      // are more stories from one place but not the other, we want to allow more stories
      // to be loaded from just the one place.
      this.incrementProperty('page');
      let pageSize = this.get('pageSize');
      let page = this.get('page');
      if(this.get('hasMoreGoth')){
        this.set('hasLoadedGoth', false);
        this.store.query('gothamist-story', {
          tag: this.get('gothTag'),
          count: pageSize,
          page: page,
        }).then(results => {
          return this.send('processResultsGoth', results);
        }).finally(() => {
          set(this, 'hasLoadedGoth', true);
        });
      }
      if(get(this, 'hasMoreWNYC')) {
        this.set('hasLoadedWNYC', false);
        this.store.query('story', {
          tags: this.get('wNYCTag'),
          page_size: pageSize,
          page: page,
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
    },

    processResultsGoth(results) {
      get(this, 'gothItems').pushObjects(results.toArray());
      this.set('hasMoreGoth', (get(results, 'meta.total_entries') > get(this, 'gothItems.length')));
    },
  }
});
