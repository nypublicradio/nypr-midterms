import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | add-query', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    const URL = 'url';
    const MEDIUM = 'medium';
    const SOURCE = 'source';
    const CAMPAIGN = 'campaign'
    this.setProperties({
      url: URL,
      medium: MEDIUM,
      foo: SOURCE,
      campaign: CAMPAIGN,
    })

    await render(hbs`{{add-query url medium=medium foo=foo campaign=campaign}}`);

    assert.equal(this.element.textContent.trim(), 'url?medium=medium&foo=source&campaign=campaign', 'renders expected query params');

    this.set('foo', undefined);
    await render(hbs`{{add-query url medium=medium foo=foo campaign=campaign}}`);
    assert.equal(this.element.textContent.trim(), 'url?medium=medium&campaign=campaign', 'should not add falsey values');
  });
});
