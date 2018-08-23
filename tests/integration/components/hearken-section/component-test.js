import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';


module('Integration | Component | hearken-section', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    let chunk2 = this.server.create('chunk', {slug: 'midterms-hearken-chunk-2'});
    this.server.db.chunks.update(chunk2.id, {content: '<a href="http://foo.com" class="foo2">foofoo</a>'});
    this.chunk2 = chunk2;
  });

  hooks.afterEach(function() {
      server.shutdown();
  });

  test('it renders with the html from the chunk', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{hearken-section slug='midterms-hearken-chunk-2'}}`);
    assert.equal(findAll('.foo2').length, 1);
  });
});
