import DS from 'ember-data';

function makeJSONAPI(entry) {
  // gothamist images are served insecure :(
  entry.thumbnail_300 = entry.thumbnail_300.replace(/^http:/, 'https:');
  entry.thumbnail_640 = entry.thumbnail_640.replace(/^http:/, 'https:');

  return {
    type: 'gothamist-story',
    id: entry.id,
    attributes: entry
  };
}

export default DS.JSONAPISerializer.extend({
  attrs: {
    author: 'author_nickname',
    tease: 'excerpt_pretty',
    thumbnailLarge: 'thumbnail_640',
    thumbnailSmall: 'thumbnail_300',
    url: 'permalink',
  },

  keyForAttribute: key => key.decamelize(),

  normalizeQueryResponse(store, modelClass, payload, ...rest) {
    return this._super(store, modelClass, { data: payload[0].map(makeJSONAPI), meta: {total_entries: payload[1] }}, ...rest);
  }
});
