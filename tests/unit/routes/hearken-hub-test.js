import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | hearken-hub', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:hearken-hub');
    assert.ok(route);
  });
});
