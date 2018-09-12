import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | share-icons', function(hooks) {
  setupRenderingTest(hooks);

  test('it opens a popup to facebook', async function() {
    const URL = encodeURIComponent(`${location}?utm_medium=social&utm_campaign=mt18&utm_source=fb`);
    this.mock(window)
      .expects('open')
      .withArgs(`https://www.facebook.com/sharer.php?u=${URL}`);

    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.fb-post}}
      {{/share-icons}}
    `);

    await click('.share-icon__fb-post');
  });

  test('it opens a pop up to twitter', async function() {
    const URL = encodeURIComponent(`${location}?utm_medium=social&utm_campaign=mt18&utm_source=tw`);
    const TEXT = 'bar';
    const VIA = 'baz';

    this.mock(window)
      .expects('open')
      .withArgs(`https://twitter.com/intent/tweet?text=${TEXT}&url=${URL}&via=${VIA}`);

    this.setProperties({
      text: TEXT,
      via: VIA,
    });

    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.tweet text=text via=via}}
      {{/share-icons}}
    `);

    await click('.share-icon__tweet');
  });

  test('it renders a mailto: link', async function() {
    const URL = encodeURIComponent(`${location}?utm_medium=Email&utm_campaign=mt18`);
    const SUBJECT = 'bar';

    this.mock(window)
      .expects('open')
      .withArgs(`mailto:?subject=${SUBJECT}&body=${URL}`);

    this.setProperties({
      subject: SUBJECT,
    });

    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.email subject=subject}}
      {{/share-icons}}
    `);

    await click('.share-icon__email');
  });

  test('it renders links', async function(assert) {
    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.link 'facebook' 'foo' 'facebook-f'}}
        {{icons.link 'twitter' 'bar'}}
        {{icons.link 'instagram' 'baz'}}
        {{icons.link 'youtube' 'qux'}}
        {{icons.link 'medium' 'fuz'}}
        {{icons.link 'linkedin' 'wiz'}}
        {{icons.link 'snap' 'wuz' 'snapchat-ghost'}}
      {{/share-icons}}
    `);

    assert.dom('a.facebook').hasAttribute('href', 'https://www.facebook.com/foo', 'facebook renders');
    assert.dom('svg.fa-facebook-f').exists('facebook renders');
    assert.dom('a.twitter').hasAttribute('href', 'https://twitter.com/bar', 'twitter renders');
    assert.dom('svg.fa-twitter').exists('twitter renders');
    assert.dom('a.instagram').hasAttribute('href', 'https://www.instagram.com/baz', 'instagram renders');
    assert.dom('svg.fa-instagram').exists('instagram renders');
    assert.dom('a.youtube').hasAttribute('href', 'https://www.youtube.com/channel/qux', 'youtube renders');
    assert.dom('svg.fa-youtube').exists('youtube renders');
    assert.dom('a.medium').hasAttribute('href', 'https://medium.com/@fuz', 'medium renders');
    assert.dom('svg.fa-medium').exists('medium renders');
    assert.dom('a.linkedin').hasAttribute('href', 'https://www.linkedin.com/company/wiz', 'linkedin renders');
    assert.dom('svg.fa-linkedin').exists('linkedin renders');
    assert.dom('a.snap').hasAttribute('href', 'https://www.snapchat.com/add/wuz', 'snap renders');
    assert.dom('svg.fa-snapchat-ghost').exists('snap renders with icon param');
  });
});
