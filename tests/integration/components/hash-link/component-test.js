import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | hash-link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a hash if given', async function(assert) {
    const URL = '/';
    const ROUTER = {
      urlFor: this.stub().returns(URL),
      transitionTo: this.stub().resolves(),
    };
    const SCROLLER = {
      scrollVertical: this.stub().resolves(),
    };

    this.mock(window.history).expects('replaceState').withArgs(null, null, '#foo');
    this.stub(document, 'querySelector')
      .withArgs('#foo').returns(true);
    document.querySelector.callThrough();

    this.setProperties({
      router: ROUTER,
      scroller: SCROLLER,
    })

    await render(hbs`{{hash-link route='index' hash='foo' label='Hash Link' router=router scroller=scroller}}`);

    await click('.hash-link');

    assert.dom('.hash-link').hasAttribute('href', '/#foo');
    assert.ok(ROUTER.urlFor.calledWith('index'));
    assert.ok(ROUTER.transitionTo.calledWith('index'));
    assert.ok(SCROLLER.scrollVertical.calledWith('#foo', {}));
  });
});
