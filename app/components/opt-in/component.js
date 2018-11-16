import Changeset from "ember-changeset";
import Component from "@ember/component";
import config from "../../config/environment";
import fetch from "fetch";
import lookupValidator from "ember-changeset-validations";
import { and } from "@ember/object/computed";
import { computed } from "@ember/object";
import { set } from "@ember/object";
import { task } from "ember-concurrency";
import {
  validateFormat,
  validatePresence
} from "ember-changeset-validations/validators";

const COPY = {
  EMAIL: `
    <p>WNYC and Gothamist are teaming up to offer essential news and analysis
      in our new newsletter, the <b>Politics Brief</b>.</p>`,
  EMAIL_SUCCESS: `
    <p><b>Thanks for subscribing to our Newsletter updates</b></p>
    <p>If you ever need to, you can modify your subscription options from the email.</p>`,
};

let newsletterEndpoint = `${config.optInAPI}/mailchimp`;
let validations = {
  email: validateFormat({ type: "email", allowBlank: true }),
  legalChecked: validatePresence(true)
};

export default Component.extend({
  classNames: ["opt-in"],
  emailResponseErrors: null,
  phoneResponseErrors: null,

  COPY,

  init() {
    this._super(...arguments);
    this.changeset = new Changeset(
      {
        email: null,
        phone: null,
        legalChecked: true
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
  submitField: task(function*(fieldName, endpoint, data) {
    if (
      this.get(`changeset.${fieldName}`) && // email has been entered
      !this.get(`changeset.error.${fieldName}`) && // no errors exist
      !this.get(`${fieldName}Success`) // not already submitted
    ) {
      return yield fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(res => {
          // Success response
          if (res.status === 200 || res.status === 201) {
            return [`${fieldName}Success`, true];
          }
          // Error response
          if (res.status >= 400) {
            return res
              .json()
              .then(json => [`${fieldName}ResponseErrors`, [json.detail]]);
          }
        })
        .catch(e => {
          return e;
        });
    }
  }),

  actions: {
    submitForms() {
      this.set("isLoading", true);

      this.get("submitField").perform("email", newsletterEndpoint, {
        email: this.get("changeset.email"),
        list: config.mailchimpList
      }).then((value) => {
        if (value) {
          this.set("isLoading", false);
          this.set(...value);
        }
      })

    }
  }
});
