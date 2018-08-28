import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const META_DESCRIPTION = "Do you have a question about how you can make a difference in your neighborhood, city or state? Is there anything you’d like to know about voting, the elections or how to navigate civic life in New York City? Ask us! Our reporters want to help you get involved by answering your questions.";

export default Route.extend({
  titleToken: "Ask a Reporter",

  head: service('head-data'),

  afterModel() {
    this.head.set('description', META_DESCRIPTION);
  }
});
