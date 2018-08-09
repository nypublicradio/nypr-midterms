import Changeset from "ember-changeset";
import Component from "@ember/component";
import lookupValidator from "ember-changeset-validations";
import { set } from "@ember/object";
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
  actions: {
    submitForms() {
      console.log("Success");
    }
  }
});
