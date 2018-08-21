import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, fillIn, click } from "@ember/test-helpers";
import { startMirage } from "nypr-midterms/initializers/ember-cli-mirage";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | opt-in", function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
  });

  test("it renders", async function(assert) {
    await render(hbs`{{opt-in}}`);

    assert.dom(".opt-in").exists();
    assert.dom(".opt-in").includesText("Get the latest");

    await fillIn("[data-test-email-input] > input", "test@example.com");
    await click("[data-test-legal-checkbox]");
    await click("[data-test-submit-button]");

    assert.dom("[data-test-email-success]").exists();

    await fillIn("[data-test-phone-input] > input", "212-555-0101");
    await click("[data-test-legal-checkbox]");
    await click("[data-test-submit-button]");

    assert.dom("[data-test-both-success]").exists();
  });
});
