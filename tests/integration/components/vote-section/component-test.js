import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | vote-section', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{vote-section}}`);

    assert.dom('.vote-section').exists();
    assert.dom('.vote-section__title').hasText('Voter Tools');
  });
});
