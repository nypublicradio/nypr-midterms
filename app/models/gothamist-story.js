import DS from 'ember-data';
import { computed } from '@ember/object';

import moment from 'moment';

export default DS.Model.extend({
  author: DS.attr('string'),
  authoredOn: DS.attr('string'),
  producingOrganizations: 'Gothamist',
  tease: DS.attr('string'),
  thumbnailLarge: DS.attr('string'),
  thumbnailSmall: DS.attr('string'),
  title: DS.attr('string'),
  url: DS.attr('string'),

  newsdate: computed('authoredOn', function() {
    return moment(this.authoredOn,  'YYYYMMDDHHmmss', 'America/New_York');
  })
});
