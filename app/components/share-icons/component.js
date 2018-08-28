import Component from '@ember/component';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  fastboot: inject(),
  isFastBoot: reads('fastboot.isFastBoot'),

  classNames: ['share-icons'],

  medium: 'social',
  campaign: 'midterms',

  getPopupPosition() {
    const dualScreenLeft = screen.availLeft;
    const dualScreenTop = screen.availTop;

    const windowWidth = screen.availWidth;
    const windowheight =  screen.availHeight;

    const left = ((windowWidth / 2) - (600 / 2)) + dualScreenLeft;
    const top = ((windowheight / 2) - (600 / 2)) + dualScreenTop;

    return {left: left, top: top};
  },

  windowFeatures({top, left}) {
    return `location=no,toolbar=no,menubar=no,scrollbars=no,status=no,width=600,height=600,top=${top},left=${left}`;
  },

  actions: {
    openShare(url) {
      if (!url) {
        return;
      }
      let popupPosition = this.getPopupPosition();
      let newWindow = window.open(url, 'share window', this.windowFeatures(popupPosition));

      if (newWindow && newWindow.focus) {
        newWindow.focus();
      }
    }
  }
});
