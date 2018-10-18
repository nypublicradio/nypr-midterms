import Route from '@ember/routing/route';

export default Route.extend({
  model({ race_id }) {
    let districts = this.modelFor('results');
    let allRaces = districts.ny.races.concat(districts.nj.races);
    let race = allRaces.find(race => race.raceID === race_id);
    if (race) {
      return race;
    } else {
      this.transitionTo('missing', `results/${race_id}`);
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    let { ny, nj } = this.modelFor('results');
    controller.setProperties({
      ny,
      nj,
    });
  },
});
