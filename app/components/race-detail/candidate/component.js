import Component from '@ember/component';
import { computed } from '@ember/object';

const PARTY_MAP = {
  GOP: {
    symbol: "R",
  },
  Dem: {
    symbol: "D"
  }
};

export default Component.extend({
  tagName: 'tr',
  classNames: ['candidate'],
  classNameBindings: ['candidate.incumbent:incumbent', 'candidate.winner:winner'],

  party: computed('candidate.party', function() {
    let party = PARTY_MAP[this.candidate.party];
    return party ? party.symbol : '';
  }),

  percent: computed('candidate.voteCount', 'totalVotes', function() {
    let percent = (this.candidate.voteCount / this.totalVotes) * 100
    if (isNaN(percent)) {
      return 0;
    }

    if (percent.toFixed(2).split('.')[1] === '00') {
      return percent.toFixed();
    } else {
      return percent.toFixed(1);
    }
  }),
});
