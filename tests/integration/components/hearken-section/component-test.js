import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';


module('Integration | Component | hearken-section', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    let chunk1 = this.server.create('chunk', {slug: 'midterms-hearken-chunk-1'});
    this.server.db.chunks.update(chunk1.id, {content: '<a href="http://foo.com" class="foo1">foo</a>'});
    this.chunk1 = chunk1;
    let chunk2 = this.server.create('chunk', {slug: 'midterms-hearken-chunk-2'});
    this.server.db.chunks.update(chunk2.id, {content: '<a href="http://foo.com" class="foo2">foofoo</a>'});
    this.chunk2 = chunk2;
  });


  test('it renders only tease when closed (default state)', async function(assert) {
// Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{hearken-section slug1='midterms-hearken-chunk-1' slug2='midterms-hearken-chunk-2'}}`);
    assert.equal(findAll('.foo1').length, 1);
    assert.equal(find('.foo1').textContent.trim(), "foo");
    assert.equal(findAll('.foo2').length, 0);
  });

  test('it renders tease and body when toggeled open', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{hearken-section slug1='midterms-hearken-chunk-1' slug2='midterms-hearken-chunk-2'}}`);
    await click('.page-section__toggle');
    assert.equal(findAll('.foo1').length, 1);
    assert.equal(find('.foo1').textContent.trim(), "foo");
    assert.equal(findAll('.foo2').length, 1);
    assert.equal(find('.foo2').textContent.trim(), "foofoo");
  });
});
