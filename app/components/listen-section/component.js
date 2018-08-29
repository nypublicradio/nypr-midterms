import Component from '@ember/component';
import { inject } from '@ember/service';

const NEWSROOM_LINKS = [{
  title: 'via Apple Podcasts',
  href: 'https://itunes.apple.com/us/podcast/id73331636',
}, {
  title: 'via Pocket Casts',
  href: 'https://play.pocketcasts.com/users/sign_in#/podcasts/show/0c3b41f0-2c8b-012e-09b1-00163e1b201c'
}, {
  title: 'via Stitcher',
  href: 'http://www.stitcher.com/podcast/wnycs-brian-lehrer-show',
}, {
  title: 'via TuneIn',
  href: 'http://tunein.com/radio/The-Brian-Lehrer-Show-p372/'
}, {
  title: 'via Google Play Music',
  href: 'https://play.google.com/music/listen?u=1#/ps/Inpyen7kzhkgzdoucvjcvrej7uq'
}, {
  title: 'via RSS',
  href: 'http://feeds.wnyc.org/wnyc_bl'
}];

export default Component.extend({
  NEWSROOM_LINKS,
  store: inject(),
  dj: inject(),
  fastboot: inject(),

  tagName: 'section',
  classNames: ['listen-section'],

  init() {
    if(!this.get('fastboot.isFastBoot')){
      this.store.findRecord('stream', 'wnyc-fm939').then(stream => this.set('stream', stream));
    }
    this._super(...arguments);
  },

  listenLive() {
    this.dj.play('wnyc-fm939');
  }
});
