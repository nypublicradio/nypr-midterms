import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | page-intro', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let router = this.owner.lookup('service:router');
    
    this.stub(router, 'urlFor').returns('');
    this.stub(router, 'isActive').returns(true);

    await render(hbs`{{page-intro}}`);

    assert.dom('.page-intro').exists();
  });
});
