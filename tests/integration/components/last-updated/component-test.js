import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | last-updated', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const NY_UPDATE = moment([2018, 11, 6, 11]);
    const NJ_UPDATE = moment([2018, 11, 6, 10]);

    this.setProperties({
      ny: {
        lastUpdated: NY_UPDATE.format(),
        pollsClosed: false,
      },
      nj: {
        lastUpdated: NJ_UPDATE.format(),
        pollsClosed: false,
      }
    });

    await render(hbs`{{last-updated ny=ny nj=nj}}`);

    assert.dom('.last-updated').hasAnyText("New York polls close at 9 p.m.");
    assert.dom('.last-updated').hasAnyText("New Jersey polls close at 8 p.m.");

    this.set('nj.pollsClosed', true);

    assert.dom('.last-updated').hasAnyText(`Results as of ${NJ_UPDATE.format('h:mm a z')}`);
    assert.dom('.last-updated').hasAnyText("New York polls close at 9 p.m.");

    this.set('ny.pollsClosed', true);
    assert.dom('.last-updated').hasAnyText(`Results as of ${NY_UPDATE.format('h:mm a z')}`);
  });
});
