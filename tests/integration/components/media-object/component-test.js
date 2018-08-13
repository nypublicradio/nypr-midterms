import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, pauseTest } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | media-object', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{media-object}}`);

    assert.dom('.media-object').exists();

    // Template block usage:
    await render(hbs`
      {{#media-object as |mo|}}
        {{#mo.media}}
          this is the media, like an image
        {{/mo.media}}

        {{#mo.body}}
          this is the body, which takes up the remaining space
        {{/mo.body}}
      {{/media-object}}
    `);

    assert.dom('.media-object').exists();
    assert.dom('.media-object__media').exists();
    assert.dom('.media-object__body').exists();
  });
});
