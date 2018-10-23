import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { RACE_GROUP } from '../../../fixtures';

module('Integration | Component | race-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('group', RACE_GROUP);

    await render(hbs`{{race-group group=group}}`);
    await settled();

    assert.dom('.race-group').exists();
    assert.dom('.race-group__title').hasText(RACE_GROUP.title);
    assert.dom('.race-detail').exists({count: RACE_GROUP.races.length});
  });
});
