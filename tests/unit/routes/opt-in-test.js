import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | opt-in', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:opt-in');
    assert.ok(route);
  });
});
