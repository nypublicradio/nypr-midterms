import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | hearken-section', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with the html from the chunk', async function(assert) {
    const SCRIPT = `<script>
      var p = document.createElement('p');
      p.textContent = 'Hello World';
      p.id = 'text';
      document.querySelector('#hearken-section__wrapper').appendChild(p);
    </script>`;
    const SLUG = 'midterms-hearken-chunk-2';
    const STORE = {
      findRecord: this.mock()
        .withArgs('chunk', SLUG)
        .resolves({
          content: SCRIPT
        })
    };
    this.setProperties({
      slug: SLUG,
      store: STORE,
    })

    await render(hbs`{{hearken-section slug=slug store=store}}`);

    assert.dom('#text').hasText('Hello World');
  });
});
