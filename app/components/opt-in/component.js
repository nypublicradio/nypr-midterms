import Changeset from "ember-changeset";
import Component from "@ember/component";
import config from "ember-get-config";
import fetch from "fetch";
import lookupValidator from "ember-changeset-validations";
import { and, or } from "@ember/object/computed";
import { computed } from "@ember/object";
import { set } from "@ember/object";
import { task } from "ember-concurrency";
import { validateFormat, validatePresence } from "ember-changeset-validations/validators";

let validations = {
  email: validateFormat({ type: "email", allowBlank: true }),
  phone: validateFormat({ type: "phone", allowBlank: true }),
  legalChecked: validatePresence(true)
};

export default Component.extend({
  classNames: ['opt-in'],
  emailResponseErrors: null,
  phoneResponseErrors: null,

  init() {
    this._super(...arguments);
    let obj = {
      email: null,
      phone: null,
      legalChecked: false
    };
    this.changeset = new Changeset(
      obj,
      lookupValidator(validations),
      validations
    );
    set(this, "changeset", this.changeset);
  },

  isSubmitButtonDisabled: computed(
    "changeset.{email,phone,legalChecked}",
    function() {
      return !(
        (this.get("changeset.email") || this.get("changeset.phone")) &&
        this.get("changeset.legalChecked")
      );
    }
  ),
  isFullFormSubmitted: and("phoneSuccess", "emailSuccess"),
  isLoading: or('submitEmail.isRunning', 'submitPhone.isRunning'),
  submitEmail: task(function*(data) {
    let newsletterEndpoint = `${config.optInAPI}/mailchimp`;
    let res = yield fetch(newsletterEndpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });

    if ([200,201].includes(res.status)) {
      this.set("emailSuccess", true);
      return;
    }

    let json = yield res.json();
    if (res.status === 400) {
      this.set('emailResponseErrors', [json['detail']])
    }

  }),
  submitPhone: task(function*(data) {
    let smsEndpoint = `${config.optInAPI}/mobile-commons`;
    let res = yield fetch(smsEndpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });

    if ([200,201].includes(res.status)) {
      this.set("phoneSuccess", true);
    }

    let json = yield res.json();
    if (res.status >= 400) {
      this.set('phoneResponseErrors', [json['detail']])
    }

  }),

  actions: {
    submitForms() {
      if (
        this.get("changeset.email") &&         // email has been entered
        !this.get("changeset.error.email") &&  // no errors exist
        !this.get("emailSuccess")              // not already submitted
      ) {
        this.get("submitEmail").perform({
          email: this.get("changeset.email"),
          list: config.mailchimpList
        });
      }
      if (
        this.get("changeset.phone") &&
        !this.get("changeset.error.phone") &&
        !this.get("phoneSuccess")
      ) {
        this.get("submitPhone").perform({
          phoneNumber: this.get("changeset.phone"),
          optIn: config.mobileCommonsOptInKey
        });
      }
    }
  }
});
