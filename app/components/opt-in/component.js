import Changeset from "ember-changeset";
import Component from "@ember/component";
import config from "ember-get-config";
import fetch from "fetch";
import lookupValidator from "ember-changeset-validations";
import { computed } from "@ember/object";
import { set } from "@ember/object";
import { task } from "ember-concurrency";
import { validateFormat } from "ember-changeset-validations/validators";

let validations = {
  email: validateFormat({ type: "email", allowBlank: true }),
  phone: validateFormat({ type: "phone", allowBlank: true })
};

export default Component.extend({
  init() {
    this._super(...arguments);
    let obj = {
      email: null,
      phone: null
    };
    this.changeset = new Changeset(
      obj,
      lookupValidator(validations),
      validations
    );
    set(this, "changeset", this.changeset);
  },

  isSubmitButtonDisabled: computed(
    "changeset.{email,phone}",
    "legalChecked",
    function() {
      return !(
        (this.get("changeset.email") || this.get("changeset.phone")) &&
        this.get("legalChecked")
      );
    }
  ),
  submitEmail: task(function*(data) {
    let newsletterEndpoint = config.newsletterSignupEndpoint;
    let res = yield fetch(newsletterEndpoint, {
      method: "POST",
      data: JSON.stringify(data)
    });
    if (res.status === 200) {
      this.set('emailSuccess', true);
    }
  }),
  submitPhone: task(function*(data) {
    let smsEndpoint = config.smsSignupEndpoint;
    yield fetch(smsEndpoint, {
      method: "POST",
      data: JSON.stringify(data)
    });
  }),

  actions: {
    submitForms() {
      if (!this.get('changeset.error.email') && this.get('changeset.email')) {
        this.get("submitEmail").perform();
      }
      if (!this.get('changeset.error.phone') && this.get('changeset.phone')) {
        this.get("submitPhone").perform();
      }
    }
  }
});
