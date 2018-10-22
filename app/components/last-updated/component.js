import Component from '@ember/component';
import { computed } from '@ember/object';
import { and } from '@ember/object/computed';
import moment from 'moment';

export default Component.extend({
  classNames: ['last-updated'],

  allClosed: and('ny.pollsClosed', 'nj.pollsClosed'),

  mostRecent: computed('ny.lastUpdated', 'nj.lastUpdated', 'electionDay', function() {
    let now = moment();
    let ny = moment(this.ny.lastUpdated);
    let nj = moment(this.nj.lastUpdated);
    let electionDay = moment(this.electionDay);
    let time;
    if (ny.isAfter(nj)) {
      time = ny;
    } else {
      time = nj;
    }

    if (now.isAfter(electionDay)) {
      return time.format('MMM. D, YYYY, h:mm a z');
    } else {
      return time.format('h:mm a z');
    }
  }),
});
