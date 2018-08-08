import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-section', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    await render(hbs`
      {{#page-section as |section|}}
        {{section.title "Title"}}
      {{/page-section}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
