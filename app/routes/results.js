import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    didTransition() {
      this.send('set', 'sticky', false);
      return true;
    },

    willTransition() {
      this.send('set', 'sticky', true);
      return true;
    },
  }
});
