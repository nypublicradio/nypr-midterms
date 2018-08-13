import StoryModel from 'nypr-publisher-lib/models/story';
import { computed } from '@ember/object';
import { imageTemplate } from 'nypr-ui/helpers/image-template';

export default StoryModel.extend({
  thumbnailSmall: computed('imageMain', function() {
    if (!this.imageMain) {
      return;
    }
    let { template, crop } = this.imageMain;

    return imageTemplate([ template, 288, 0, crop ]);
  }),
  thumbnailLarge: computed('imageMain', function() {
    if (!this.imageMain) {
      return;
    }
    let { template, crop } = this.imageMain;

    return imageTemplate([ template, 787, 0, crop ]);
  })
})
