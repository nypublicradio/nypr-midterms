import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';


module('Integration | Component | q-and-a', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    let chunk1 = this.server.create('chunk', {slug: 'midterms-hearken-chunk-1'});
    this.server.db.chunks.update(chunk1.id, {content: '<a href="http://foo.com" class="foo1">foofoo</a>'});
    this.chunk1 = chunk1;
  });

  hooks.afterEach(function() {
      server.shutdown();
  });


  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`{{hearken-section slug='midterms-hearken-chunk-1'}}`);
    assert.equal(findAll('.foo1').length, 1);
  });
});
