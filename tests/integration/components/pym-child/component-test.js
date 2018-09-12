import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

import * as pym from 'pym';

module('Integration | Component | pym-child', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls pym on render', async function() {
    const IFRAME_SRC = 'http://example.com';
    this.set('target', IFRAME_SRC);

    this.mock(pym.default)
      .expects('Parent')
      .once()
      .withArgs('foo-pym', IFRAME_SRC);

    await render(hbs`{{pym-child target=target elementId='foo'}}`);
  });
});
