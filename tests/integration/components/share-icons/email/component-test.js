import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | share-icons/email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.setProperties({
      subject: 'foo',
      url: 'bar',
    });
    await render(hbs`{{share-icons/email url=url subject=subject}}`);

    assert.dom('.share-icon__email').exists();
    assert.dom('.share-icon__email').hasAttribute('href', 'mailto:?subject=foo&body=bar');
  });
});
