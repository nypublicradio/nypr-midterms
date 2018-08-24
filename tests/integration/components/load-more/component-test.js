import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';


module('Integration | Component | load-more', function(hooks) {
  setupRenderingTest(hooks);

  let fakeResponse = EmberObject.create({
    data: [1,2,3],
    meta: {
      pagination: {
        count: 15
      }
    },
    toArray() {
      return this.data;
    }
  });

  let gothTag = '@goth';
  let wNYCTag = 'wnyc';
  let storyObject1 = { newsdate: "20180823142058"}
  let storyObject2 = { newsdate: "20180823162434"}

  let store = {
      findRecord: this.mock()
        .withArgs('gothamist-story', {
          tag: gothTag,
          pageSize: 5,
          page: 1
        })
        .resolves({
          data: [storyObject1, storyObject2, storyObject1, storyObject2, storyObject1]
        })
        .withArgs('gothamist-story', )
    };

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{load-more}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#load-more}}
        template block text
      {{/load-more}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('it calls fetch upon load with proper params', async function(assert) {
    let done = assert.async();
    let callCount = 0;

    this.set('fetch', ({pageSize, page}) => {
      callCount = callCount + 1;
      assert.equal(pageSize, 12, "page size should be 12");
      assert.equal(page, 1, "page should be 1");

      return RSVP.Promise.resolve(fakeResponse).finally(() => {
        done();
      });
    });

    await render(hbs`
      {{#data-loader fetch=(action fetch) as |results|}}
        <div class="results">
          {{#each results.data as |n|}}{{n}}{{/each}}
        </div>
      {{/data-loader}}
    `);

    assert.equal(callCount, 1, "fetch was called");
    assert.equal(find('.results').textContent.trim(), "123");
  });
});
