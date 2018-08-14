import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

import config from '../../../../config/environment';

import * as fetch from 'fetch';

module('Integration | Component | updates-section', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{updates-section}}`);

    assert.dom('section.update-section').exists();
    assert.dom('h1').hasText('Get Updates');
  });

  test('subscribing', async function(assert) {
    const PHONE = '2125550101';
    const EMAIL = 'email@example.com';

    const EMAIL_RESPONSE = {
      email_address: EMAIL,
      status: 'subscribed',
      list_id: config.mailchimpList,
    };
    const SMS_RESPONSE = {
      cmpaign_id: '1',
      opt_in_path_id: '12345',
      phone_number: PHONE,
    };

    const SMS_PAYLOAD = {
      method: 'POST',
      body: JSON.stringify({phoneNumber: PHONE, optIn: config.mobileCommonsOptInKey}),
      headers: {'Content-Type': 'application/json'}
    };
    const NEWSLETTER_PAYLOAD = {
      method: 'POST',
      body: JSON.stringify({email: EMAIL, list: config.mailchimpList}),
      headers: {'Content-Type': 'application/json'}
    };

    let fetchStub = this.stub(fetch, 'default');
    fetchStub.withArgs(`${config.optInAPI}/mailchimp`, NEWSLETTER_PAYLOAD)
      .resolves({json: () => Promise.resolve(EMAIL_RESPONSE)});
    fetchStub.withArgs(`${config.optInAPI}/mobile-commons`, SMS_PAYLOAD)
      .resolves({json: () => Promise.resolve(SMS_RESPONSE)});

    await render(hbs`{{updates-section}}`);

    await fillIn('[data-test-input=email]', EMAIL);
    await click('[data-test-legal-input]');
    await click('[data-test-submit]');

    await fillIn('[data-test-input=sms]', PHONE);
    await click('[data-test-legal-input]');
    await click('[data-test-submit]');

    assert.ok(fetchStub.calledTwice, 'two POSTs');
    assert.ok(fetchStub.calledWith(`${config.optInAPI}/mailchimp`, NEWSLETTER_PAYLOAD));
    assert.ok(fetchStub.calledWith(`${config.optInAPI}/mobile-commons`, SMS_PAYLOAD));
  });

  test('error states', async function(assert) {
    await render(hbs`{{updates-section}}`);

    await fillIn('[data-test-input=email]', 'bad@email');

    assert.dom('[data-test-error=email]').hasText('Please enter a valid email address.');

    await fillIn('[data-test-input=email]', 'good@email.com');
    await click('[data-test-submit]');

    assert.dom('[data-test-error=email]').doesNotExist();
    assert.dom('[data-test-legal-input]').hasClass('is-error');

    await render(hbs`{{updates-section step='sms'}}`);

    await fillIn('[data-test-input=sms]', '123');

    assert.dom('[data-test-error=sms]').hasText('Please enter a valid phone number.');

    await fillIn('[data-test-input=sms]', '5165551212');
    await click('[data-test-submit]');

    assert.dom('[data-test-error=sms]').doesNotExist();
    assert.dom('[data-test-legal-input]').hasClass('is-error');
  })
});
