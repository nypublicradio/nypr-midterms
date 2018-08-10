import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pill-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#pill-dropdown as |dropdown|}}
        {{dropdown.button "Foo"}}

        {{#dropdown.content}}
          whatever you want in here
        {{/dropdown.content}}
      {{/pill-dropdown}}
    `);

    assert.dom('button.pill-dropdown__button').hasText('Foo');
    assert.dom('.pill-dropdown__button').doesNotHaveClass('is-open');
    assert.dom('.pill-dropdown__content').doesNotExist();

    await click('button.pill-dropdown__button');

    assert.dom('.pill-dropdown__button').hasClass('is-open');
    assert.dom('.pill-dropdown__content').hasText('whatever you want in here');
  });

  test('button accepts a block', async function(assert) {
    await render(hbs`
      {{#pill-dropdown as |dropdown|}}
        {{#dropdown.button}}
          Hello World
        {{/dropdown.button}}
      {{/pill-dropdown}}
    `);

    assert.dom('button.pill-dropdown__button').hasText('Hello World');
  });
});
