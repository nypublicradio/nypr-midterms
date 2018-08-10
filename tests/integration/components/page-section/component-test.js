import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-section', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    await render(hbs`
      {{#page-section as |section|}}
        {{#section.tease}}
          <h2>This is visible</h2>
          <p>
            anything can go in here
          </p>
        {{/section.tease}}

        {{#section.body}}
          <p>
            Hidden until clicked
          </p>
        {{/section.body}}
      {{/page-section}}
    `);

    assert.dom('.page-section').hasText('This is visible anything can go in here');

    assert.dom('.page-section').hasClass('is-closed');
    assert.dom('.page-section__tease').hasClass('is-closed');
    assert.dom('.page-section__body').hasClass('is-closed');

    assert.dom('.page-section__body-wrapper').doesNotExist();

    await click('.page-section__toggle');

    assert.dom('.page-section__body-wrapper').exists();
    assert.dom('.page-section__body').hasText('Hidden until clicked');

    assert.dom('.page-section').hasClass('is-open');
    assert.dom('.page-section__tease').hasClass('is-open');
    assert.dom('.page-section__body').hasClass('is-open');
  });

  test('it yields out a bound `isOpen` value', async function(assert) {
    await render(hbs`
      {{#page-section as |section|}}
        {{#section.tease}}
          <h2>This is visible</h2>
          {{#unless section.isOpen}}
          <p>
            only show this if it's closed
          </p>
          {{/unless}}
        {{/section.tease}}

        {{#section.body}}
          <p>
            Hidden until clicked
          </p>
        {{/section.body}}
      {{/page-section}}
    `);

    assert.dom('.page-section__tease p').exists();

    await click('.page-section__toggle');

    assert.dom('.page-section__tease p').doesNotExist('should hide when open');
  })

  test('it yields out a `toggleOpen` action', async function(assert) {
      await render(hbs`
        {{#page-section as |section|}}
          {{#section.tease}}
            <h2>This is visible</h2>
            <button {{action section.toggleOpen}}>
              open up!
            </button>
          {{/section.tease}}

          {{#section.body}}
            <p>
              Hidden until clicked
            </p>
          {{/section.body}}
        {{/page-section}}
      `);

      assert.dom('.page-section__body-wrapper').doesNotExist();
      await click('.page-section__tease button');

      assert.dom('.page-section__body-wrapper').exists();

      assert.dom('.page-section').hasClass('is-open');
      assert.dom('.page-section__tease').hasClass('is-open');
      assert.dom('.page-section__body').hasClass('is-open');
  });

  test('it can start open', async function(assert) {
    await render(hbs`
      {{#page-section open=true as |section|}}
        {{#section.tease}}
          <h2>This is visible</h2>
          <p>
            anything can go in here
          </p>
        {{/section.tease}}

        {{#section.body}}
          <p>
            Already visible!
          </p>
        {{/section.body}}
      {{/page-section}}
    `);


    assert.dom('.page-section__body-wrapper').exists();
    assert.dom('.page-section__body').hasText('Already visible!');

    assert.dom('.page-section').hasClass('is-open');
    assert.dom('.page-section__tease').hasClass('is-open');
    assert.dom('.page-section__body').hasClass('is-open');

    await click('.page-section__toggle');

    assert.dom('.page-section').hasClass('is-closed');
    assert.dom('.page-section__tease').hasClass('is-closed');
    assert.dom('.page-section__body').hasClass('is-closed');

    assert.dom('.page-section__body-wrapper').doesNotExist();
  });
});
