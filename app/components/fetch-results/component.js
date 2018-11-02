import Component from '@ember/component';
import { bind } from '@ember/runloop';
import { hash } from 'rsvp';
import { inject } from '@ember/service';

import fetch from 'fetch';

import config from '../../config/environment';

// AP raceID values
const NY_TO_WATCH = [
  "36581", // House District 1
  "36582", // House District 2
  "36591", // House District 11
  "36598", // House District 18
  "36599", // House District 19
  "36601", // House District 21
  "36602", // House District 22
  "36604", // House District 24
  "36607", // House District 27
  "36614", // State Senate District 3
  "36615", // State Senate District 4
  "36616", // State Senate District 5
  "36617", // State Senate District 6
  "36618", // State Senate District 7
  "36619", // State Senate District 8
  "36622", // State Senate District 11
  "36633", // State Senate District 22
  "36650", // State Senate District 39
  "36651", // State Senate District 40
  "36652", // State Senate District 41
  "36653", // State Senate District 42
  "36654", // State Senate District 43
  "36661", // State Senate District 50
  "36664", // State Senate District 53
];

const NJ_TO_WATCH = [
  "31205", // House District 2
  "31205", // House District 3
  "31208", // House District 4
  "31218", // House District 7
  "31230", // House District 11
  "31545", // NJ Senate
];

const BALLOT_MEASURES = [
  "40291", // NY Ballot Measure 1
  "40292", // NY Ballot Measure 2
  "40290", // NY Ballot Measure 3
  "31673", // NJ Ballot Measure 1
];

const RACE_POLLER = 'races';

export default Component.extend({
  router: inject(),
  poll: inject(),

  didInsertElement() {
    this._super(...arguments);

    // check votes in the machine once a minute for updated results
    this.poll.addPoll({
      interval: 60 * 1000,
      label: RACE_POLLER,
      callback: bind(this, 'getData')
    });
    this.getData();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.poll.clearPollByLabel(RACE_POLLER);
  },

  getData() {
    this._getRaces().then(({nj, ny}) => {
      let swingRaces = [];
      let all = ny.races.concat(nj.races);

      // use combined `all` races array and pull out the races editorial wants to watch
      // filtering based on the arrays from above allow us to specify the order in the final `swingRaces` array
      NY_TO_WATCH.forEach(raceID => swingRaces.push(all.find(r => r.raceID === raceID)));
      NJ_TO_WATCH.forEach(raceID => swingRaces.push(all.find(r => r.raceID === raceID)));
      BALLOT_MEASURES.forEach(raceID => swingRaces.push(all.find(r => r.raceID === raceID)));

      let swing = {
        title: "Races to Watch (NY&nbsp;&amp;&nbsp;NJ)",
        races: swingRaces,
      };

      ny.title = "New York (All&nbsp;Races)";
      nj.title = "New Jersey (All&nbsp;Races)";

      // HACK: close the polls
      // nj.pollsClosed = true;
      // ny.pollsClosed = false;

      this.setProperties({
        nj,
        ny,
        swing,
      });

      // on race detail views, `raceID` is passed in from the controller via query param
      // so pull out the desired race and set it on the template
      // transition to 404 if the given race isn't found
      if (this.raceID) {
        let race = all.find(race => race.raceID === this.raceID);
        if (race) {
          this.set('race', race);
        } else {
          this.router.transitionTo('missing', `missing/${this.raceID}`);
        }
      }
    });
  },

  _getRaces() {
    return hash({
      nj: fetch(config.njResults).then(r => r.json()),
      ny: fetch(config.nyResults).then(r => r.json()),
    });
  }
});
