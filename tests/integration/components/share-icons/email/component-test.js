import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-icons/email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{share-icons/email}}`);

    assert.dom('.share-icon__email').exists();

    // Template block usage:
    await render(hbs`
      {{#share-icons/email}}
        template block text
      {{/share-icons/email}}
    `);

    assert.dom('.share-icon__email').hasText('template block text');
  });
});
