import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | race-table/candidate', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const CANDIDATE = {
      "first": "Daryl",
      "last": "Kipnis",
      "party": "GOP",
      "candidateID": "39168",
      "polID": "66857",
      "ballotOrder": 2,
      "polNum": "34977",
      "voteCount": 124414
    };
    const totalVotes = 408018;
    this.setProperties({
      candidate: CANDIDATE,
      totalVotes,
    });

    await render(hbs`{{race-detail/candidate candidate=candidate totalVotes=totalVotes}}`);
    assert.dom('.candidate').exists();
    assert.dom('.candidate__name').hasText("Daryl Kipnis (R)");
    assert.dom('.candidate__count').hasText("124,414");
    assert.dom('.candidate__percent').hasText(`${((CANDIDATE.voteCount/totalVotes) * 100).toFixed(1)}%`);

    this.set('candidate.incumbent', true);
    assert.dom('.candidate.incumbent').exists();

    this.set('candidate.winner', "X");
    assert.dom('.candidate.winner').exists();
  });
});
