import Component from '@ember/component';
import { get, set, getWithDefault } from '@ember/object';
import { observer } from '@ember/object';
import { sort } from '@ember/object/computed';
import moment from 'moment';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Component.extend({
  store: service(),
  classNames: ['load-more'],
  elementId: 'load-more-anchor',

  hasLoadedWNYC: false,
  hasLoadedGoth: false,
  hasLoaded: false,
  hasMoreWNYC: true,
  hasMoreGoth: true,
  hasMore: true,
  hasLoadedChanged: observer('hasLoadedWNYC', 'hasLoadedGoth', function() {
    set(this, 'hasLoaded', get(this, 'hasLoadedWNYC') && get(this, 'hasLoadedGoth'));
  }),
  hasMoreChanged: observer('hasMoreWNYC', 'hasMoreGoth', function() {
    set(this, 'hasMore', get(this, 'hasMoreWNYC') || get(this, 'hasMoreGoth'));
  }),
  setItems: observer('hasLoaded', function() {
    set(this, 'items', get(this, 'wNYCItems').concat(get(this, 'gothItems')));
    //set(this, 'items', sortedResults.toArray());
  }),
  sortedItems: sort('items', function(a, b) {
    return moment(b.newsdate) - moment(a.newsdate);
  }),

  init() {
    set(this, 'pageGoth',  getWithDefault(this, 'page', 1));
    set(this, 'pageWNYC',  getWithDefault(this, 'page', 1));
    set(this, 'pageSize',  getWithDefault(this, 'pageSize', 5));
    this.resetState();
    this.on('didUpdateAttrs', this.resetState);
    this._super(...arguments);
  },

  resetState() {
    set(this, 'page', 1);
    set(this, 'items', []);
    set(this, 'wNYCItems', []);
    set(this, 'gothItems', []);
    this.send('fetchData');
  },

  didRender() {
    let e = $('.load-more');
    if(e.length > 0) {
      e[0].scrollIntoView();
    }
  },


  actions: {
    fetchData() {
      this.set('hasLoadedWNYC', false);
      this.set('hasLoadedGoth', false);
      let pageSize = this.get('pageSize');
      let pageWNYC = this.get('pageWNYC');
      let pageGoth = this.get('pageGoth');
      if(this.get('hasMoreGoth')){
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
      if(get(this, 'hasMoreWNYC')){
        this.store.query('story', {
          tags: this.get('wNYCTag'),
          page_size: pageSize,
          page: pageWNYC,
          ordering: '-newsdate',
          'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
        }).then(results => {
          return this.send('processResultsWNYC', results);
        }).finally(() => {
          set(this, 'hasLoadedWNYC', true)
        });
      }
      // if there are no more stores from wnyc and gothamist,
      // hasMore will be set to false, and the load more button will dissapear
      // but in the case where there are more stories from one place but not the other,
      // we want to allow more stories to be loaded from just the one place.
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
    }
  }

});
