import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | story-tease', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const STORY = {
      producingOrganizations: [{ name: 'Foo' }],
      url: 'http://example.com',
      title: 'Bar',
      imageUrl: 'https://via.placeholder.com/350x150',
      tease: 'Biz baz boz',
      newsdate: new Date(),
    };
    this.set('story', STORY);

    await render(hbs`{{story-tease showImage=true imageUrl=story.imageUrl story=story}}`);

    assert.dom('article.story-tease').exists();
    assert.dom('.story-tease__brand').hasText(STORY.producingOrganizations[0].name);
    assert.dom('.story-tease__title a').hasAttribute('href', STORY.url);
    assert.dom('.story-tease__thumb img').hasAttribute('src', STORY.imageUrl);
    assert.dom('.story-tease__summary').hasText(STORY.tease);
    assert.dom('.story-tease__date').hasText(`Published ${moment(STORY.newsdate).fromNow()}`);


    await render(hbs`{{story-tease imageUrl=story.imageUrl story=story}}`);
    assert.dom('.story-tease__thumb').doesNotExist('thumbnail is controlled via parameter');

    await render(hbs`{{story-tease showImage=true story=story}}`);
    assert.dom('.story-tease__thumb').doesNotExist('thumbnail is controlled via availability of an imageUrl');
  });
});
