import DS from 'ember-data';

function makeJSONAPI(entry) {
  return {
    type: 'gothamist-story',
    id: entry.id,
    attributes: entry
  };
}

export default DS.JSONAPISerializer.extend({
  attrs: {
    author: 'author_nickname',
    imageMain: 'thumbnail_640',
    tease: 'excerpt_full',
    url: 'permalink',
  },

  keyForAttribute: key => key.decamelize(),

  normalizeQueryResponse(store, modelClass, payload, ...rest) {
    return this._super(store, modelClass, { data: payload.map(makeJSONAPI) }, ...rest);
  }
});