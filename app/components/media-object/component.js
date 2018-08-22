import Component from '@ember/component';
import { computed } from '@ember/object';

const V_ALIGNS = {
  c: 'center',
  b: 'bottom',
  t: 'top',
};

const H_ALIGNS = {
  c: 'center',
  l: 'left',
  r: 'right',
}

export default Component.extend({
  classNames: ['media-object'],
  classNameBindings: ['vertical-align', 'horizontal-align'],

  'vertical-align': computed('valign', function() {
    if (this.valign && V_ALIGNS[this.valign]) {
      return `vertical--${V_ALIGNS[this.valign]}`;
    }
  }),

  'horizontal-align': computed('valign', function() {
    if (this.halign && H_ALIGNS[this.halign]) {
      return `horizontal--${H_ALIGNS[this.halign]}`;
    }
  }),
});
