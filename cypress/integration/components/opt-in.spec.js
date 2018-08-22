/**
 *
 * The various data elements used in this component:
 *
 * [data-test-email-input]
 * [data-test-legal-checkbox]
 * [data-test-phone-input
 * [data-test-submit-button]
 * [data-test-newsletter-success]
 * [data-test-sms-success]
 * [data-test-both-success]
 *
 */

// Language/Copy
const EMAIL_VALIDATION_ERROR = "Email must be a valid";
const PHONE_VALIDATION_ERROR = "Phone must be a valid";

const EMAIL_RESPONSE_ERROR = "Email response error";
const PHONE_RESPONSE_ERROR = "Phone response error";

const EMAIL_ONLY_SUCCSS_TEXT = "subscribing to our Newsletter";
const PHONE_ONLY_SUCCSS_TEXT = "subscribing to SMS";
const BOTH_SUCCESS_TEXT = "Newsletter and SMS updates";

// Endpoints
const NEWSLETTER_ENDPOINT = "/opt-in/v1/subscribe/mailchimp";
const SMS_ENDPOINT = "/opt-in/v1/subscribe/mobile-commons";

// Custom commands
Cypress.Commands.add("shutdownMirage", () => {
  cy.window().then((win) => {
    win.localStorage.shutdownMirage = true;
  })
});
Cypress.Commands.add("submit", () => {
  cy.get("[data-test-submit-button]").click();
});
Cypress.Commands.add("fillOutEmail", (email = "test@example.com") => {
  cy.get("[data-test-email-input]")
    .find("input")
    .type(email)
    .blur();
});
Cypress.Commands.add("fillOutPhone", (phoneNumber = "212-555-0101") => {
  cy.get("[data-test-phone-input]")
    .find("input")
      .type(phoneNumber)
      .blur();
});
Cypress.Commands.add("checkLegal", () => {
  cy.get("[data-test-legal-checkbox]").click()
});

// Tests
describe("Overall testing", function() {
  beforeEach(() => {
    cy.viewport(1024, 600);
    cy.shutdownMirage();
    cy.server()
    cy.route({
      url: NEWSLETTER_ENDPOINT,
      method: 'POST',
      response: {
        email_address: "email@example.com",
        status: 'subscribed',
        list_id: 'a1b2c3'
      }
    }).as('submitEmail');
    cy.route({
      url: SMS_ENDPOINT,
      method: 'POST',
      response: {
        campaign_id: "1",
        opt_in_path_id: "12345",
        phone_number: "212-555-0101"
      }
    }).as('submitPhone');
    cy.visit("/opt-in");
    cy.wait(100);
  });
  afterEach(() => {
    // cy.screenshot();
  })

  // Passing tests
  it("Email validates when user leaves field (e.g. on blur)", function() {
    cy.get("body")
      .should("not.contain", EMAIL_VALIDATION_ERROR)
      .should("not.contain", PHONE_VALIDATION_ERROR);
    cy.fillOutEmail("not an email")
    cy.get("body")
      .should("contain", EMAIL_VALIDATION_ERROR)
      .should("not.contain", PHONE_VALIDATION_ERROR);
  });
  it("Phone validates when user leaves field (e.g. on blur)", function() {
    cy.fillOutPhone("not a phone number");
    cy.get("body")
      .should("not.contain", EMAIL_VALIDATION_ERROR)
      .should("contain", PHONE_VALIDATION_ERROR)
  });
  it("Can submit if user entered only email", function() {
    cy.fillOutEmail()
    cy.checkLegal()
    cy.submit()
    cy.wait('@submitEmail');
    cy.get("[data-test-email-input]").should('not.exist');
    cy.get("[data-test-legal-checkbox]").should('exist');
    cy.get("[data-test-phone-input]").should('exist');
  });
  it("Can submit if user entered only phone", function() {
    cy.fillOutPhone();
    cy.checkLegal();
    cy.submit();
    cy.wait('@submitPhone');
    cy.get("[data-test-email-input]").should('exist');
    cy.get("[data-test-legal-checkbox]").should('exist');
    cy.get("[data-test-phone-input]").should('not.exist');
  });
  it("Can submit if user entered correct email, invalid phone", function() {
    cy.fillOutEmail('realemail@example.com');
    cy.fillOutPhone('fake phone');
    cy.checkLegal();
    cy.submit();
    cy.wait('@submitEmail');
    cy.get("[data-test-email-input]").should('not.exist');
    cy.get("[data-test-legal-checkbox]").should('exist');
    cy.get("[data-test-phone-input]").should('exist');
  });
  it("Can submit if user entered correct phone, invalid email", function() {
    cy.fillOutEmail('broke-email');
    cy.fillOutPhone('212-555-0101');
    cy.checkLegal();
    cy.submit();
    cy.wait('@submitPhone');
    cy.get("[data-test-phone-input]").should('not.exist');
    cy.get("[data-test-email-input]").should('exist');
    cy.get("[data-test-legal-checkbox]").should('exist');
  });
  it("Cannot submit if both phone/email are blank", function() {
    cy.get("[data-test-submit-button]").should('be.disabled');
  });
  it("Cannot submit without the legal checkbox checked", function() {
    cy.fillOutEmail('broke-email');
    cy.fillOutPhone('212-555-0101');
    cy.get("[data-test-submit-button]").should('be.disabled');
  });
  it("Receives success response when submitting email only", function() {
    cy.fillOutEmail()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', EMAIL_ONLY_SUCCSS_TEXT)
  });
  it("Receives success response when submitting phone only", function() {
    cy.fillOutPhone()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', PHONE_ONLY_SUCCSS_TEXT)
  });
  it("Receives success response when submitting both phone/email", function() {
    cy.fillOutPhone()
    cy.fillOutEmail()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', BOTH_SUCCESS_TEXT)
  });
  it("Can handle error from SMS endpoint", function() {
    cy.fillOutPhone()
    cy.checkLegal()
    cy.route({
      url: SMS_ENDPOINT,
      method: 'POST',
      status: 400,
      response: {
        detail: PHONE_RESPONSE_ERROR,
        status: 400,
      }
    }).as('submitEmail');
    cy.submit()
  });
  it("Can handle error from newsletter endpoint", function() {
    cy.fillOutEmail()
    cy.checkLegal()
    cy.route({
      url: NEWSLETTER_ENDPOINT,
      method: 'POST',
      status: 400,
      response: {
        detail: EMAIL_RESPONSE_ERROR,
        instance: "instance id",
        status: 400,
        title: "Mailchimp Error title",
        type: "URL to Mailchimp Error Glossary",
      }
    }).as('submitEmail');
    cy.submit()
    cy.get('body').should('contain', EMAIL_RESPONSE_ERROR)
    cy.get('body').should('not.contain', PHONE_RESPONSE_ERROR)
  });
  it("Can handle successful email, errored phone", function() {
    cy.route({
      url: SMS_ENDPOINT,
      method: 'POST',
      status: 400,
      response: {
        detail: PHONE_RESPONSE_ERROR,
        status: 400,
      }
    }).as('submitEmail');
    cy.fillOutEmail()
    cy.fillOutPhone()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', EMAIL_ONLY_SUCCSS_TEXT)
    cy.get('body').should('contain', PHONE_RESPONSE_ERROR)
    cy.get('body').should('not.contain', EMAIL_RESPONSE_ERROR)
  });
  it("Can handle successful phone, errored email", function() {
    cy.route({
      url: NEWSLETTER_ENDPOINT,
      method: 'POST',
      status: 400,
      response: {
        detail: EMAIL_RESPONSE_ERROR,
        instance: "instance id",
        status: 400,
        title: "Mailchimp Error title",
        type: "URL to Mailchimp Error Glossary",
      }
    }).as('submitEmail');
    cy.fillOutEmail()
    cy.fillOutPhone()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', PHONE_ONLY_SUCCSS_TEXT)
    cy.get('body').should('contain', EMAIL_RESPONSE_ERROR)
    cy.get('body').should('not.contain', PHONE_RESPONSE_ERROR)
  });
  it("Can handle both endpoints returning erorrs", function() {
    cy.route({
      url: NEWSLETTER_ENDPOINT,
      method: 'POST',
      status: 400,
      response: {
        detail: EMAIL_RESPONSE_ERROR,
        instance: "instance id",
        status: 400,
        title: "Mailchimp Error title",
        type: "URL to Mailchimp Error Glossary",
      }
    }).as('submitEmail');
    cy.route({
      url: SMS_ENDPOINT,
      method: 'POST',
      status: 400,
      response: {
        detail: PHONE_RESPONSE_ERROR,
        status: 400,
      }
    }).as('submitEmail');
    cy.fillOutEmail()
    cy.fillOutPhone()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('not.contain', PHONE_ONLY_SUCCSS_TEXT)
    cy.get('body').should('not.contain', EMAIL_ONLY_SUCCSS_TEXT)
    cy.get('body').should('contain', EMAIL_RESPONSE_ERROR)
    cy.get('body').should('contain', PHONE_RESPONSE_ERROR)
  });
  it("Can handle sequential email submission, then phone", function() {
    cy.fillOutEmail()
    cy.checkLegal()
    cy.submit()
    cy.fillOutPhone()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', BOTH_SUCCESS_TEXT)
  });
  it("Can handle sequential phone submission, then email", function() {
    cy.fillOutPhone()
    cy.checkLegal()
    cy.submit()
    cy.fillOutEmail()
    cy.checkLegal()
    cy.submit()
    cy.get('body').should('contain', BOTH_SUCCESS_TEXT)
  });
  it("Can fire both email/phone and only return when both are completed/failed", function() {
    cy.fillOutPhone()
    cy.checkLegal()
    cy.fillOutEmail()
    cy.route({
      url: SMS_ENDPOINT,
      method: 'POST',
      delay: 1000,
      response: {
        campaign_id: "1",
        opt_in_path_id: "12345",
        phone_number: "212-555-0101"
      }
    }).as('submitPhone');
    cy.submit()
    cy.wait('@submitEmail');
    cy.get('body').should('not.contain', EMAIL_ONLY_SUCCSS_TEXT)
    cy.wait('@submitPhone');
    cy.get('body').should('contain', BOTH_SUCCESS_TEXT)
  });
  it("Not submitting does not uncheck the button", function() {
    cy.fillOutEmail("fakeemail")
    cy.checkLegal()
    cy.submit()
    cy.get("[data-test-legal-checkbox]").siblings('input').should('be.checked');
  });
});

