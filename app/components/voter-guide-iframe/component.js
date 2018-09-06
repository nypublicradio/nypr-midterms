import Component from '@ember/component';
import pym from "pym";
import config from "../../config/environment";

export default Component.extend({
  didInsertElement() {
    new pym.Parent("pym_voter_guide", "http://staging.project.wnyc.org/ny-primary-sept-2018/");
  }
});
