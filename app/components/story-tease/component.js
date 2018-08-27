import Component from '@ember/component';

export default Component.extend({
  tagName: 'article',
  classNames: ['story-tease'],
  classNameBindings: ['featured:is-featured', 'alignment', 'imageUrl:has-image:no-image']
});
