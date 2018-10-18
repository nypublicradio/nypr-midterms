import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Component.extend({
  tagName: 'article',
  classNames: ['race-detail'],

  title: computed('race.{officeName,seatName}', 'state', function() {
    let { officeName, seatName, statePostal } = this.race;
    seatName = seatName ? ` - ${seatName}` : '';
    return `${officeName}${seatName} (${statePostal})`;
  }),

  precincts: computed('race.{precinctsReporting,precinctsTotal}', function() {
    let precincts = (this.race.precinctsReporting/this.race.precinctsTotal) * 100;
    if (isNaN(precincts)) {
      return 0;
    }

    if (precincts.toFixed(2).split('.')[1] === '00') {
      return precincts.toFixed();
    } else {
      return precincts.toFixed(1);
    }
  }),

  candidates: sort('race.candidates', (a, b) => a.ballotOrder - b.ballotOrder),
});
