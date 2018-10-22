import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import fetch from 'fetch';
import { hash } from 'rsvp';

import config from '../config/environment';

const RACE_POLLER = 'races';

// AP raceID values
const NY_TO_WATCH = [
  "36581", // House District 1
  "36582", // House District 2
  // House District 11
  // House District 18
  // House District 19
  // House District 21
  // House District 22
  // House District 24
  // House District 27
  // State Senate District 3
  // State Senate District 4
  // State Senate District 5
  // State Senate District 6
  // State Senate District 7
  // State Senate District 8
  // State Senate District 11
  // State Senate District 22
  // State Senate District 39
  // State Senate District 40
  // State Senate District 41
  // State Senate District 42
  // State Senate District 43
  // State Senate District 50
  // State Senate District 53
];

const NJ_TO_WATCH = [
  // House District 2
  // House District 3
  // House District 4
  // House District 7
  // House District 11
  // NJ Senate
];

const BALLOT_MEASURES = [
  // NY Ballot Measure 1
  // NY Ballot Measure 2
  // NY Ballot Measure 3
  // NJ Ballot Measure 1
]

export default Route.extend({
  poll: inject(),

  getRaces() {
    return hash({
      nj: fetch(config.njResults).then(r => r.json()),
      ny: fetch(config.nyResults).then(r => r.json()),
    });
  },

  model() {
    return this.getRaces().then(({nj, ny}) => {
      let nyToWatch = ny.races.filter(race => NY_TO_WATCH.includes(race.raceID));
      let njToWatch = nj.races.filter(race => NJ_TO_WATCH.includes(race.raceID));

      // TODO: lift up metadata to top level
      let swing = {
        title: "Races to Watch (NY & NJ)",
        races: nyToWatch.concat(njToWatch),
      };

      ny.title = "New York (All Races)";
      nj.title = "New Jersey (All Races)";

      // HACK: close the polls
      // nj.pollsClosed = true;
      // ny.pollsClosed = true;

      return {
        ny,
        nj,
        swing,
      };
    });
  },

  actions: {
    didTransition() {
      this.poll.addPoll({
        interval: 60 * 1000,
        label: RACE_POLLER,
        callback: () => this.refresh(),
      });
    },

    willTransition() {
      this.poll.clearPollByLabel(RACE_POLLER);
    },
  }
});
