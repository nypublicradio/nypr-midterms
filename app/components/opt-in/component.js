import Changeset from "ember-changeset";
import Component from "@ember/component";
import config from "ember-get-config";
import fetch from "fetch";
import lookupValidator from "ember-changeset-validations";
import { and, or } from "@ember/object/computed";
import { computed } from "@ember/object";
import { set } from "@ember/object";
import { all, task } from "ember-concurrency";
import {
  validateFormat,
  validatePresence
} from "ember-changeset-validations/validators";

let newsletterEndpoint = `${config.optInAPI}/mailchimp`;
let smsEndpoint = `${config.optInAPI}/mobile-commons`;
let validations = {
  email: validateFormat({ type: "email", allowBlank: true }),
  phone: validateFormat({ type: "phone", allowBlank: true }),
  legalChecked: validatePresence(true)
};

export default Component.extend({
  classNames: ["opt-in"],
  emailResponseErrors: null,
  phoneResponseErrors: null,

  init() {
    this._super(...arguments);
    this.changeset = new Changeset(
      {
        email: null,
        phone: null,
        legalChecked: false
      },
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
  submitEmail: task(function*(data) {
    return yield fetch(newsletterEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        // Success response
        if (res.status === 200 || res.status === 201) {
          return ["emailSuccess", true];
        }
        // Error response
        if (res.status >= 400) {
          return res
            .json()
            .then(json => ["emailResponseErrors", [json.detail]]);
        }
      })
      .catch(e => {
        return e;
      });
  }),
  submitPhone: task(function*(data) {
    return yield fetch(smsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        // Success response
        if (res.status === 200 || res.status === 201) {
          return ["phoneSuccess", true];
        }
        // Error response
        if (res.status >= 400) {
          return res
            .json()
            .then(json => ["phoneResponseErrors", [json.detail]]);
        }
      })
      .catch(e => {
        return e;
      });
  }),

  actions: {
    submitForms() {
      let childTasks = [];
      if (
        this.get("changeset.email") && // email has been entered
        !this.get("changeset.error.email") && // no errors exist
        !this.get("emailSuccess") // not already submitted
      ) {
        childTasks.push(
          this.get("submitEmail").perform({
            email: this.get("changeset.email"),
            list: config.mailchimpList
          })
        );
      }
      if (
        this.get("changeset.phone") &&
        !this.get("changeset.error.phone") &&
        !this.get("phoneSuccess")
      ) {
        childTasks.push(
          this.get("submitPhone").perform({
            phoneNumber: this.get("changeset.phone").replace(/\D/g, ""),
            optIn: config.mobileCommonsOptInKey
          })
        );
      }
      all(childTasks).then(completedJobs => {
        completedJobs.forEach(values => this.set(...values));
      });
    }
  }
});
