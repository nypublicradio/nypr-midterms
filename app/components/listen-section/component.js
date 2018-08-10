import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  dj: inject(),

  tagName: 'section',
  classNames: ['listen-section'],

  listenLive() {
    this.dj.play('wnyc-fm939');
  }
});
