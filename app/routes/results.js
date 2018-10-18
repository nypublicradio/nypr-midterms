import Route from '@ember/routing/route';
import fetch from 'fetch';
import { hash } from 'rsvp';

import config from '../config/environment';

// AP raceID values
const NY_TO_WATCH = [
  "36581",
  "36582",
];

const NJ_TO_WATCH = [

];

export default Route.extend({
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
      nj.pollsClosed = true;
      ny.pollsClosed = true;

      return {
        ny,
        nj,
        swing,
      };
    });
  },

});
