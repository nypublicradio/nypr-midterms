import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | player-wrapper', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{player-wrapper}}`);
    assert.dom('.nypr-player').doesNotExist('player does not render unless there is a sound object');

    this.set('sound', {});
    await render(hbs`{{player-wrapper sound=sound}}`);
    assert.dom('.nypr-player').exists();
  });
});
