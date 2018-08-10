import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | episode-tease', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    let dj = this.owner.lookup('service:dj');
    this.mock(dj).expects('play').withArgs('audio-id').resolves();

    this.set('links', [{
      title: 'via RSS',
      href: 'http://rss.com'
    }, {
      title: 'via iTunes',
      href: 'http://itunes.com'
    }]);

    await render(hbs`
      {{#episode-tease audio='audio-id' as |tease|}}
        {{tease.title "This Great Episode"}}
        {{tease.link "See All Episodes" "http://moreepisodes.com"}}

        {{#tease.body}}
          Lorem ipsum lorem ipsum
        {{/tease.body}}

        {{tease.footer links=links}}

      {{/episode-tease}}
    `);

    assert.dom('article.episode-tease').exists();
    assert.dom('.episode-tease__title').hasText('This Great Episode');

    let moreLink = assert.dom('.episode-tease__link')
    moreLink.hasText('See All Episodes');
    moreLink.hasAttribute('href', 'http://moreepisodes.com');

    assert.dom('.episode-tease__body').hasText('Lorem ipsum lorem ipsum');

    assert.dom('.episode-subscribe').exists();
    await click('.episode-subscribe button');

    assert.dom('.episode-subscribe__list li').exists({count: 2});
    assert.dom('[data-test-subscribe="0"] .fa-rss').exists('should use an rss icon for rss links');

    await click('[data-test-listen]');
  });
});
