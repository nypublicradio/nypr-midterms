import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nav-links', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const router = this.owner.get('router');
    router.setupRouter();
  });

  test('it renders', async function(assert) {
    this.set('links', [{
      text: 'Foo',
      route: 'foo'
    }, {
      text: 'Bar',
      route: 'bar'
    }]);
    await render(hbs`
      {{#nav-links links=links as |link|}}
        {{link.text}}
      {{/nav-links}}
    `);

    await click('.nav-links__list-item:nth-child(2)');
    assert.dom('.nav-links__list-item:nth-child(2) > .nav-bar').exists('nav bar moves to second spot');
  });
});
