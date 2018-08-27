import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';



module('Integration | Component | load-more', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

      let gothTag = '@goth';
      let wNYCTag = 'wnyc';
      let storyObject3 = { newsdate: "20180823103815"};
      let storyObject1 = { newsdate: "20180823142058"};
      let storyObject2 = { newsdate: "20180823162434"};
      let gothQuery1 = {
        tag: gothTag,
        count: 5,
        page: 1
      }
      let gothQuery2 = {
        tag: gothTag,
        count: 5,
        page: 2,
      }
      let wNYCQuery1 = {
        tags: wNYCTag,
        page_size: 5,
        page: 1,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      }

      let store = {
        query: this.stub()
          .withArgs('gothamist-story', gothQuery1)
          .resolves({
          data: [storyObject1, storyObject1, storyObject1, storyObject1, storyObject1],
            meta: {
              total_entries: 10
            },
            toArray() {
              return this.data;
            }
          }
      )};
      store.query.withArgs('gothamist-story', gothQuery2)
        .resolves({
          data: [storyObject2, storyObject2, storyObject2, storyObject2, storyObject2],
          meta: {
            total_entries: 10
          },
          toArray() {
            return this.data;
          }
        }
      );
      store.query.withArgs('story', wNYCQuery1)
        .resolves({
          data: [storyObject3, storyObject3, storyObject3, storyObject3, storyObject3],
          meta: {
            pagination: {
              count: 5
            }
          },
          toArray() {
            return this.data;
          }
        }
      );


    this.setProperties({
      gothTag: gothTag,
      wNYCTag: wNYCTag,
      store: store,
    });

    await render(hbs`{{load-more gothTag=gothTag wNYCTag=wNYCTag store=store}}`);
    assert.ok(store.query.calledTwice, 'two queries');
    assert.ok(store.query.calledWith('gothamist-story', gothQuery1), 'called with goth query');
    assert.ok(store.query.calledWith('story', wNYCQuery1), 'called with wnyc query');
    assert.dom('.load-more__button').hasText('Load More');

    await click('.load-more__button');
    // three queries should be made here: two goth and one wnyc. the load component should have
    // calculated from the meta.pagination.count that there are no more wnyc stories.
    assert.ok(store.query.calledThrice, 'three total queries');
    assert.ok(store.query.calledWith('gothamist-story', gothQuery2), 'called with goth query 2');

    // all stories have been loaded
    assert.dom('.load-more__button').doesNotExist();



  });
});
