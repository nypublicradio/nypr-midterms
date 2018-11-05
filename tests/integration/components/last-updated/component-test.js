import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import sinon from 'sinon';

module('Integration | Component | last-updated', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const NY_UPDATE = moment([2018, 10, 6, 11]);
    const NJ_UPDATE = moment([2018, 10, 6, 10]);
    const ELECTION_DAY = moment([2018, 10, 6]);
    let clock = sinon.useFakeTimers(ELECTION_DAY.toDate());

    this.setProperties({
      ny: {
        lastUpdated: NY_UPDATE.format(),
        pollsClosed: false,
      },
      nj: {
        lastUpdated: NJ_UPDATE.format(),
        pollsClosed: false,
      },
      electionDay: ELECTION_DAY,
    });

    await render(hbs`{{last-updated ny=ny nj=nj electionDay=(array 2018 10 6)}}`);

    assert.dom('.last-updated').hasAnyText("New York polls close at 9 p.m.");
    assert.dom('.last-updated').hasAnyText("New Jersey polls close at 8 p.m.");

    this.set('nj.pollsClosed', true);

    assert.dom('.last-updated').hasAnyText(`Results as of ${NJ_UPDATE.format('h:mm a z')}`);
    assert.dom('.last-updated').hasAnyText("New York polls close at 9 p.m.");

    this.set('ny.pollsClosed', true);
    assert.dom('.last-updated').hasAnyText(`Results as of ${NY_UPDATE.format('h:mm a z')}`);

    clock.restore();

    clock = sinon.useFakeTimers(ELECTION_DAY.clone().add(1, 'day').toDate());

    await render(hbs`{{last-updated ny=ny nj=nj electionDay=(array 2018 10 6)}}`);

    assert.dom('.last-updated__line').hasText(`Results as of ${NY_UPDATE.format('MMM. D, YYYY, h:mm a z')}`);

    clock.restore();
  });
});
