import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { RACE } from '../../../fixtures';

module('Integration | Component | race-detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('race', RACE);

    await render(hbs`{{race-detail race=race state="NY"}}`);

    assert.dom('.race-detail').exists();
    assert.dom('.race-detail__subhead > .precincts-reporting').hasAnyText(`${((RACE.precinctsReporting/RACE.precinctsTotal) * 100).toFixed(2)}%`);
    assert.dom('.race-detail__subhead > .watch-precinct').exists();

    assert.dom('.candidate-row').exists({count: 2});

    assert.dom('.race-detail__title').hasText("U.S. House - District 12 (NY)");

    this.set('race.seatName', null);
    assert.dom('.race-detail__title').hasText("U.S. House (NY)");
  });
});
