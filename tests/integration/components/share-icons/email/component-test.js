import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-icons/email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const URL = encodeURIComponent(`${location}?utm_medium=Email&utm_campaign=midterms`);
    this.setProperties({
      subject: 'foo',
      url: location,
    });
    await render(hbs`{{share-icons/email url=url subject=subject campaign='midterms' medium='Email'}}`);

    assert.dom('.share-icon__email').exists();
    assert.dom('.share-icon__email').hasAttribute('href', `mailto:?subject=foo&body=${URL}`);
  });
});
