import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, get } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Component.extend({
  tagName: '',

  hifi: inject(),
  dj:   inject(),

  isStream: reads('hifi.isStream'),
  metadata: reads('hifi.currentMetadata'),

  sound:          reads('dj.currentSound'),
  model:          reads('dj.currentContentModel'),
  currentAudioId: reads('dj.currentContentId'),

  currentShow: computed('isStream', 'metadata', function() {
    if (!this.metadata || !this.metadata.contentModel) {
      return;
    }
    let { isStream, metadata: { contentModel }} = this;
    if (isStream) {
      return contentModel.currentShow
    } else {
      return {
        title: get(contentModel, 'showTitle'),
        url: get(contentModel, 'headers.brand.url'),
      };
    }
  }),

  currentStory: computed('isStream', 'metadata', function() {
    if (!this.metadata || !this.metadata.contentModel) {
      return;
    }
    let { isStream, metadata: { contentModel }} = this;

    if (isStream) {
      return {
        title: get(contentModel, 'currentShow.episodeTitle'),
        url: get(contentModel, 'curentShow.episodeUrl'),
      }
    } else {
      return contentModel;
    }
  }),

  stream: computed('isStream', 'model', function() {
    if (this.isStream) {
      return this.model;
    } else {
      return {};
    }
  }),
  streamScheduleUrl: reads('stream.scheduleUrl'),
  streamUrl:         reads('stream.url'),
  streamName:        reads('stream.name')
});
