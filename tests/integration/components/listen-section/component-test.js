import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | listen-section', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{listen-section}}`);

    assert.dom('.listen-section').exists();
  });

  test('it hides the buttons when open', async function(assert) {
    await render(hbs`{{listen-section}}`);

    await click('[data-test-open-listen]');
    assert.dom('.listen-section > .page-section').hasClass('is-open');
  });

  test('it plays the wnyc live stream', async function() {
    let dj = this.owner.lookup('service:dj');
    this.mock(dj).expects('play').withArgs('wnyc-fm939');

    await render(hbs`{{listen-section}}`);

    await click('[data-test-listen-live]');
  });
});
