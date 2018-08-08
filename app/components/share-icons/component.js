import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  fastboot: inject(),
  isFastBoot: reads('fastboot.isFastBoot'),

  classNames: ['share-icons'],

  url: computed('isFastBoot', function() {
    if (this.get('isFastBoot')) {
      let { protocol, host, path } = this.get('fastboot.request').getProperties('protocol', 'host', 'path');
      return `${protocol}//${host}${path}`;
    } else {
      return window.location.toString();
    }
  }),

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
