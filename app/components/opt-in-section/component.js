import Component from '@ember/component';
import { bind } from '@ember/runloop';
import { validateFormat } from 'ember-changeset-validations/validators';
import fetch from 'fetch';

import config from '../../config/environment';

const LEGAL = () => (key, value) => value === true;

const EMAIL_VALIDATIONS = {
  email: validateFormat({ type: 'email', message: 'Please enter a valid email address.'}),
  legal: LEGAL(),
};

const SMS_VALIDATIONS = {
  sms: validateFormat({ type: 'phone', message: 'Please enter a valid phone number.'}),
  legal: LEGAL(),
};

const NEWSLETTER = 'newsletter';
const SMS = 'sms';
const DONE = 'done';

export default Component.extend({
  tagName: 'section',
  classNames: ['opt-in-section'],

  step: NEWSLETTER,

  NEWSLETTER,
  SMS,
  DONE,
  EMAIL_VALIDATIONS,
  SMS_VALIDATIONS,

  checkResponse(r) {
    if (r.status >= 400) {
      return r.json().then(j => Promise.reject(j));
    } else {
      return r.json();
    }
  },

  submitEmail(email) {
    return fetch(`${config.optInAPI}/mailchimp`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, list: config.mailchimpList})
    }).then(bind(this, 'checkResponse'));
  },

  submitPhone(phoneNumber) {
    return fetch(`${config.optInAPI}/mobile-commons`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({phoneNumber, optIn: config.mobileCommonsOptInKey})
    }).then(bind(this, 'checkResponse'));
  }
});
