import Component from '@ember/component';
import { computed } from '@ember/object';
import { and } from '@ember/object/computed';
import moment from 'moment';

export default Component.extend({
  classNames: ['last-updated'],

  allClosed: and('ny.pollsClosed', 'nj.pollsClosed'),

  mostRecent: computed('ny.lastUpdated', 'nj.lastUpdated', function() {
    let ny = moment(this.ny.lastUpdated);
    let nj = moment(this.nj.lastUpdated);
    if (ny.isAfter(nj)) {
      return ny;
    } else {
      return nj;
    }
  }),
});
