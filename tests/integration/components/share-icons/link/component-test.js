import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-icons/link', function(hooks) {
  setupRenderingTest(hooks);

  // see tests/integration/components/share-icons/component-test.js for usage
  test('it renders', async function(assert) {
    await render(hbs`{{share-icons/link}}`);

    assert.dom('.share-icon__link').exists();
  });
});
