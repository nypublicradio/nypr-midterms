import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import moment from 'moment';

module('Integration | Component | read-section', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{read-section}}`);
    assert.dom('.read-section').exists();

    await click('.read-section .page-section__toggle');
    assert.ok('can render without a list of stories');
  });

  test('it accepts a list of wnyc and gothamist stories', async function(assert) {
    const WNYC = [{
      title: '5: Story',
      newsdate: moment([1990, 0, 1, 15, 1, 0]),
    }, {
      title: '6: Story',
      newsdate: moment([1990, 0, 1, 15, 1, 1]),
    }, {
      title: '1: Story',
      tease: 'Oldest',
      newsdate: moment([1990, 0, 1, 12, 0, 0]),
    }, {
      title: '7: Story',
      newsdate: moment([1990, 0, 1, 15, 1, 2]),
    }];

    const GOTHAMIST = [{
      title: '8: Story',
      tease: 'Newest',
      newsdate: moment([1990, 0, 1, 15, 1, 3]),
    }, {
      title: '2: Story',
      newsdate: moment([1990, 0, 1, 13, 0, 0]),
    }, {
      title: '4: Story',
      newsdate: moment([1990, 0, 1, 15, 0, 0]),
    }, {
      title: '3: Story',
      newsdate: moment([1990, 0, 1, 14, 0, 0]),
    }];

    this.setProperties({
      wnyc: WNYC,
      gothamist: GOTHAMIST
    });

    await render(hbs`{{read-section wnyc=wnyc gothamist=gothamist}}`);
    await click('.read-section .page-section__toggle');

    assert.equal(findAll('.story-tease').length, 4, 'only 4 stories render')

    // starts at 8, and counts down
    findAll('.story-tease').forEach((el, i) => {
      let title = el.querySelector('.story-tease__title').textContent.trim();
      assert.equal(title, `${8 - i}: Story`);
    })

    assert.dom('[data-test-story-tease="0"] .story-tease__summary').hasText('Newest');
  });
});
