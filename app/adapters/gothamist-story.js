import DS from 'ember-data';
import fetch from 'fetch';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  query(store, type, query) {
    return fetch(`${config.gothamistAPI}?index=gothamist&tag=${query.tag}&count=${query.count}`)
      .then(r => r.json()).then(({entries = []}) => entries)
      .catch(() => []);
  }
});
