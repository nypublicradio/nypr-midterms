import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | serialized-list', function(hooks) {
  setupRenderingTest(hooks);

  test('splits a list by a given separator', async function(assert) {
    this.set('list', ['foo', 'bar', 'baz']);

    await render(hbs`{{serialized-list list}}`);

    assert.equal(this.element.textContent.trim(), 'foo, bar and baz', 'defaults to ", " and adds "and"');

    await render(hbs`{{serialized-list list separator=' + '}}`);
    assert.equal(this.element.textContent.trim(), 'foo + bar and baz', 'can specify a different separator');

    await render(hbs`{{serialized-list list separator=' + ' and=' + '}}`);
    assert.equal(this.element.textContent.trim(), 'foo + bar + baz', 'can override the `and` value');

    await render(hbs`{{serialized-list list and=false}}`);
    assert.equal(this.element.textContent.trim(), 'foo, bar baz', 'can blank out and');
  });

  test('complex objects', async function(assert) {
    this.set('list', [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]);

    await render(hbs`{{serialized-list list key='name'}}`);
    assert.equal(this.element.textContent.trim(), 'foo, bar and baz', 'can specify a key name');

    this.set('list', ['foo', 'bar', 'baz']);
    await render(hbs`{{serialized-list list key='name.first'}}`);
    assert.equal(this.element.textContent.trim(), 'foo, bar and baz', 'can specify a nested key name on a primitive object');
  });

  test('single object', async function(assert) {
    this.set('list', ['foo']);
    await render(hbs`{{serialized-list list}}`);
    assert.equal(this.element.textContent.trim(), 'foo');

    this.set('list', 'foo');
    await render(hbs`{{serialized-list list}}`);
    assert.equal(this.element.textContent.trim(), 'foo', 'can specify a non list list');

  })
});
