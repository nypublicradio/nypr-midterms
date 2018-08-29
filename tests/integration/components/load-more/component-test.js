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
      let gothQuery1 = { tag: gothTag, count: 5, page: 1 };
      let gothQuery2 = { tag: gothTag, count: 5, page: 2 };
      let gothQuery3 = { tag: gothTag, count: 5, page: 3 };
      let wNYCQuery1 = {
        tags: wNYCTag,
        page_size: 5,
        page: 1,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,appearances,image_main,url,tease,slug,url,headers,show_title'
      };
      let wNYCQuery2 = {
        tags: wNYCTag,
        page_size: 5,
        page: 2,
        ordering: '-newsdate',
        'fields[story]': 'title,newsdate,producing_organizations,appearances,image_main,url,tease,slug,url,headers,show_title'
      };


    let store = this.owner.lookup('service:store');
    let storeStub = this.stub(store, 'query');
    storeStub.withArgs('gothamist-story', gothQuery1).resolves({
        data: [storyObject1, storyObject1, storyObject1, storyObject1, storyObject1],
        meta: {
          total_entries: 15
        },
        toArray() {
          return this.data;
        }
      }
    );
    storeStub.withArgs('gothamist-story', gothQuery2).resolves({
        data: [storyObject2, storyObject2, storyObject2, storyObject2, storyObject2],
        meta: {
          total_entries: 15
        },
        toArray() {
          return this.data;
        }
      }
    );
    storeStub.withArgs('gothamist-story', gothQuery3).resolves({
        data: [storyObject3, storyObject3, storyObject3, storyObject3, storyObject3],
        meta: {
          total_entries: 15
        },
        toArray() {
          return this.data;
        }
      }
    );
    storeStub.withArgs('story', wNYCQuery1).resolves({
        data: [storyObject2, storyObject3, storyObject3, storyObject3, storyObject3],
        meta: {
          pagination: {
            count: 6
          }
        },
        toArray() {
          return this.data;
        }
      }
    );
    storeStub.withArgs('story', wNYCQuery2).resolves({
        data: [storyObject3],
        meta: {
          pagination: {
            count: 6
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

    await render(hbs`{{#load-more gothTag=gothTag wNYCTag=wNYCTag as |results|}} {{#each results.data}} <p class="result"></p> {{/each}} {{/load-more}}`);
    assert.ok(storeStub.calledTwice, 'two queries');
    assert.ok(storeStub.calledWith('gothamist-story', gothQuery1), 'called with goth query');
    assert.ok(storeStub.calledWith('story', wNYCQuery1), 'called with wnyc query');
    assert.dom('.load-more__button').hasText('Load More');
    assert.dom('.result').exists({ count: 10});

    await click('.load-more__button');
    // two more queries should be made here: one goth and one wnyc. there should be 16 results total, as only 1
    // wnyc story is left.
    assert.ok(storeStub.callCount, 4, 'four total queries');
    assert.ok(storeStub.calledWith('gothamist-story', gothQuery2), 'called with goth query 2');
    assert.ok(storeStub.calledWith('story', wNYCQuery2), 'called with wnyc query 2');
    assert.dom('.load-more__button').hasText('Load More');
    assert.dom('.result').exists({ count: 16});



    await click('.load-more__button');
    // five queries should be made by now. The component should know there are no more
    // goth stories (this is known from the meta info) so it only loads from wnyc.
    assert.equal(storeStub.callCount, 5, 'five total queries');
    assert.ok(storeStub.calledWith('gothamist-story', gothQuery3), 'called with goth query 3');
    assert.dom('.result').exists({ count: 21});


    // all stories have been loaded
    assert.dom('.load-more__button').doesNotExist();
  });
});
