export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  const EMAIL = 'email@example.com';
  const PHONE_NUMBER = '212-555-0101'
  const OPT_IN_PATH_ID = '12345';
  const LIST_ID = 'a1b2c3';

  this.post("/newsletter-signup", function() {
    return { email_address: EMAIL, status: "subscribed", list_id: LIST_ID };
  });

  this.post("/sms-signup", function() {
    return {
      campaign_id: "1",
      opt_in_path_id: OPT_IN_PATH_ID,
      phone_number: PHONE_NUMBER
    };
  });

}

