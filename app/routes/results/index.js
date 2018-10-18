import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    filter: {
      refreshModel: true
    }
  },

  model({ filter }) {
    let model = this.modelFor('results');
    return model[filter] || {};
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
