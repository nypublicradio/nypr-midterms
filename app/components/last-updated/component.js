import Component from '@ember/component';
import { computed } from '@ember/object';
import { and } from '@ember/object/computed';
import { inject } from '@ember/service';

const POST_ELECTION_FORMAT = 'MMM. D, YYYY, h:mm a z';
const ELECTION_DAY_FORMAT = 'h:mm a z';

export default Component.extend({
  moment: inject(),

  classNames: ['last-updated'],

  allClosed: and('ny.pollsClosed', 'nj.pollsClosed'),

  isAfterElectionDay: computed('electionDay', function() {
    let now = this.moment.moment();
    let electionDay = this.moment.moment(this.electionDay);
    return now.isAfter(electionDay);
  }),

  getTimeStamp(timestamp) {
    let time = this.moment.moment(timestamp);
    if (this.isAfterElectionDay) {
      return time.format(POST_ELECTION_FORMAT);
    } else {
      return time.format(ELECTION_DAY_FORMAT);
    }
  },

  nyTimeStamp: computed('ny.lastUpdated', function() {
    return this.getTimeStamp(this.ny.lastUpdated);
  }),

  njTimeStamp: computed('nj.lastUpdated', function() {
    return this.getTimeStamp(this.nj.lastUpdated);
  }),

  mostRecent: computed('ny.lastUpdated', 'nj.lastUpdated', function() {
    if (!this.ny || !this.nj) {
      return;
    }
    let ny = this.moment.moment(this.ny.lastUpdated);
    let nj = this.moment.moment(this.nj.lastUpdated);
    if (ny.isAfter(nj)) {
      return this.nyTimeStamp;
    } else {
      return this.njTimeStamp;
    }
  }),
});
