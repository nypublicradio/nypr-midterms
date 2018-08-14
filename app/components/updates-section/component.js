import Component from '@ember/component';
import { validateFormat } from 'ember-changeset-validations/validators';
import fetch from 'fetch';

import config from '../../config/environment';

const LEGAL = () => (key, value) => value === true;

const EMAIL_VALIDATIONS = {
  email: validateFormat({ type: 'email', allowBlank: true, message: 'Please enter a valid email address.'}),
  legal: LEGAL(),
};

const SMS_VALIDATIONS = {
  sms: validateFormat({ type: 'phone', allowBlank: true, message: 'Please enter a valid phone number.'}),
  legal: LEGAL(),
};

const NEWSLETTER = 'newsletter';
const SMS = 'sms';
const DONE = 'done';

export default Component.extend({
  tagName: 'section',
  classNames: ['update-section'],

  step: NEWSLETTER,

  NEWSLETTER,
  SMS,
  DONE,
  EMAIL_VALIDATIONS,
  SMS_VALIDATIONS,

  submitEmail(email) {
    return fetch(`${config.optInAPI}/mailchimp`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, list: config.mailchimpList})
    }).then(r => r.json())
  },

  submitPhone(phoneNumber) {
    return fetch(`${config.optInAPI}/mobile-commons`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({phoneNumber, optIn: config.mobileCommonsOptInKey})
    }).then(r => r.json())
  }
});
