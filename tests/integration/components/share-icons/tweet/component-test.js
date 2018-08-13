import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-icons/tweet', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{share-icons/tweet}}`);

    assert.dom('.share-icon__tweet').exists();

    // Template block usage:
    await render(hbs`
      {{#share-icons/tweet}}
        template block text
      {{/share-icons/tweet}}
    `);

    assert.dom('.share-icon__tweet').hasText('template block text');
  });
});
