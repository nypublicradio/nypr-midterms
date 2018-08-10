import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-section/body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Template block usage:
    await render(hbs`
      {{#page-section/body isOpen=true}}
        template block text
      {{/page-section/body}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
