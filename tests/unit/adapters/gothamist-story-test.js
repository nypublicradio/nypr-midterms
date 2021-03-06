import { module } from 'qunit';
import { setupTest } from 'ember-qunit';

import test from 'ember-sinon-qunit/test-support/test';
import * as fetch from 'fetch';

import config from '../../../config/environment';

module('Unit | Adapter | gothamist story', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:gothamist-story');
    assert.ok(adapter);
  });

  test('it requests the gothamist endpoint for stories for a query', function() {
    const QUERY = {
      tag: 'foo',
      count: 2,
      page: 1
    };

    this.mock(fetch)
      .expects('default')
      .once()
      .withArgs(`${config.gothamistAPI}?index=gothamist&tag=${QUERY.tag}&count=${QUERY.count}&page=${QUERY.page}`)
      .resolves({ json: () => Promise.resolve(['foo', 'bar', 'baz']) });

    let adapter = this.owner.lookup('adapter:gothamist-story');
    adapter.query(null, null, QUERY);
  });
});
