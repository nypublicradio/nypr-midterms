import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  calculatePosition(trigger) {
    let { top, left, width, height } = trigger.getBoundingClientRect();
    let style = {
      left,
      width,
      top: top +  window.pageYOffset + height + 16,
    };

    return { style };
  }
});
