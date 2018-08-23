import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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

  test('alignments', async function(assert) {
    await render(hbs`{{media-object valign='c'}}`);
    assert.dom('.media-object.vertical--center').exists();

    await render(hbs`{{media-object valign='t'}}`);
    assert.dom('.media-object.vertical--top').exists();

    await render(hbs`{{media-object valign='b'}}`);
    assert.dom('.media-object.vertical--bottom').exists();

    await render(hbs`{{media-object halign='c'}}`);
    assert.dom('.media-object.horizontal--center').exists();

    await render(hbs`{{media-object halign='l'}}`);
    assert.dom('.media-object.horizontal--left').exists();

    await render(hbs`{{media-object halign='r'}}`);
    assert.dom('.media-object.horizontal--right').exists();
  });
});
