import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | share-icons', function(hooks) {
  setupRenderingTest(hooks);

  test('it opens a popup to facebook', async function() {
    const URL = window.location.toString();
    this.mock(window)
      .expects('open')
      .withArgs(`https://www.facebook.com/sharer.php?u=${URL}`);

    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.fb-post}}
      {{/share-icons}}
    `);

    await click('.share-icons__fb-post');
  });

  test('it opens a pop up to twitter', async function() {
    const URL = window.location.toString();
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

    await click('.share-icons__tweet');
  });

  test('it renders a mailto: link', async function(assert) {
    const URL = window.location.toString();
    const SUBJECT = 'bar';

    this.setProperties({
      subject: SUBJECT,
    });

    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.email subject=subject}}
      {{/share-icons}}
    `);

    assert.dom('a.share-icons__email').hasAttribute('href', `mailto:?subject=${SUBJECT}&body=${URL}`);
  });

  test('it renders links', async function(assert) {
    await render(hbs`
      {{#share-icons as |icons|}}
        {{icons.link 'facebook' 'foo'}}
        {{icons.link 'twitter' 'bar'}}
        {{icons.link 'instagram' 'baz'}}
        {{icons.link 'youtube' 'qux'}}
        {{icons.link 'medium' 'fuz'}}
        {{icons.link 'linkedin' 'wiz'}}
        {{icons.link 'snap' 'wuz' 'snapchat-ghost'}}
      {{/share-icons}}
    `);

    assert.dom('a[href="https://www.facebook.com/foo"]').exists('facebook renders');
    assert.dom('i.fa-facebook').exists('facebook renders');
    assert.dom('a[href="https://twitter.com/bar"]').exists('twitter renders');
    assert.dom('i.fa-twitter').exists('twitter renders');
    assert.dom('a[href="https://twitter.com/bar"]').exists('instagram renders');
    assert.dom('i.fa-instagram').exists('instagram renders');
    assert.dom('a[href="https://twitter.com/bar"]').exists('youtube renders');
    assert.dom('i.fa-youtube').exists('youtube renders');
    assert.dom('a[href="https://twitter.com/bar"]').exists('medium renders');
    assert.dom('i.fa-medium').exists('medium renders');
    assert.dom('a[href="https://twitter.com/bar"]').exists('linkedin renders');
    assert.dom('i.fa-linkedin').exists('linkedin renders');
    assert.dom('a[href="https://twitter.com/bar"]').exists('snap renders');
    assert.dom('i.fa-snapchat-ghost').exists('snap renders with icon param');
  });
});
