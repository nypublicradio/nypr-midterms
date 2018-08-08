import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-icons/fb-post', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{share-icons/fb-post}}`);

    assert.dom('button.share-icons__fb-post').exists();

    await render(hbs`
      {{#share-icons/fb-post}}
        click me
      {{/share-icons/fb-post}}
    `);

    assert.dom('button.share-icons__fb-post').hasText('click me');
  });
});
