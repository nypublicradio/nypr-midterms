import Component from '@ember/component';
import config from "../../config/environment";
import pym from "pym";

export default Component.extend({
  voterGuideIframe: config.voterGuideIframe,
  didInsertElement() {
    new pym.Parent("pym_voter_guide", this.voterGuideIframe);
  }
});
