import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | episode-tease', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#episode-tease audio='audio-id' as |tease|}}
        {{#tease.content}}
        {{/tease.content}}

        {{#tease.footer}}
        {{/tease.footer}}

      {{/episode-tease}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
