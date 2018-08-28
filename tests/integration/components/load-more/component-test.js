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
      let storyObject3 = { newsdate: "2018-08-28T05:11:34-04:00" };
      let storyObject2 = { newsdate: "2018-08-28T06:10:30-04:00" };
      let storyObject1 = { newsdate: "2018-08-28T07:00:48-04:00" };
      let gothQuery1 = {
        tag: gothTag,
        count: 10,
        page: 1
      };
      let gothQuery2 = {
        tag: gothTag,
        count: 10,
        page: 2,
      };
      let wNYCQuery1 = {
        tags: wNYCTag,
        page_size: 10,
        page: 1,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      };
      let wNYCQuery2 = {
        tags: wNYCTag,
        page_size: 10,
        page: 2,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,slug,appearances,image_main,url,tease'
      };


    let storeStub = this.stub(store, 'query')
        .withArgs('gothamist-story', gothQuery1).resolves({
        data: [storyObject1, storyObject1, storyObject1, storyObject1, storyObject1,
               storyObject1, storyObject1, storyObject1, storyObject1, storyObject1],
          meta: {
            total_entries: 20
          },
          toArray() {
            return this.data;
          }
        }
    );
    storeStub.withArgs('gothamist-story', gothQuery2).resolves({
        data: [storyObject2, storyObject2, storyObject2, storyObject2, storyObject2,
               storyObject3, storyObject3, storyObject3, storyObject3, storyObject3],
        meta: {
          total_entries: 20
        },
        toArray() {
          return this.data;
        }
      }
    );
    storeStub.withArgs('story', wNYCQuery1).resolves({
        data: [storyObject2, storyObject3, storyObject3, storyObject3, storyObject3,
               storyObject3, storyObject3, storyObject3, storyObject3, storyObject3],
        meta: {
          pagination: {
            count: 20
          }
        },
        toArray() {
          return this.data;
        }
      }
    );
    storeStub.withArgs('story', wNYCQuery2).resolves({
        data: [storyObject3, storyObject3, storyObject3, storyObject3, storyObject3,
               storyObject3, storyObject3, storyObject3, storyObject3, storyObject3],
        meta: {
          pagination: {
            count: 20
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
    });

    await render(hbs`{{load-more gothTag=gothTag wNYCTag=wNYCTag}}`);
    assert.ok(storeStub.calledTwice, 'two queries');
    assert.ok(storeStub.calledWith('gothamist-story', gothQuery1), 'called with goth query');
    assert.ok(storeStub.calledWith('story', wNYCQuery1), 'called with wnyc query');
    assert.dom('.load-more__button').hasText('Load More');

    await click('.load-more__button');
    // three queries should be made here: two goth and one wnyc. the load component should have
    // calculated from the cairns that there are still 10 wnyc stories unshown, so there is no
    // need to load more.
    assert.ok(storeStub.calledThrice, 'three total queries');
    assert.ok(storeStub.calledWith('gothamist-story', gothQuery2), 'called with goth query 2');

    await click('.load-more__button');
    // four queries should be made. The component should know it needs more stories from both
    // wnyc and goth, but there are no more goth stories (this is known from the meta info),
    // so it only loads from wnyc.
    assert.equal(storeStub.callCount, 4, 'four total queries');
    assert.ok(storeStub.calledWith('story', wNYCQuery2), 'called with wnyc query');

    // all stories have been loaded
    assert.dom('.load-more__button').doesNotExist();
  });
});
