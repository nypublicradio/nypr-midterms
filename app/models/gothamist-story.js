import DS from 'ember-data';
import { computed } from '@ember/object';

import moment from 'moment';

export default DS.Model.extend({
  author: DS.attr(),
  authoredOn: DS.attr(),
  imageMain: DS.attr(),
  producingOrganizations: 'Gothamist',
  tease: DS.attr(),
  title: DS.attr(),
  url: DS.attr(),

  newsdate: computed('authoredOn', function() {
    return moment(this.authoredOn,  'YYYYMMDDHHmmss', 'America/New_York');
  })
});
