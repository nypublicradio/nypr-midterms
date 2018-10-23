import {
  animate,
} from 'liquid-fire';

export default function grow() {
  this.lookup('crossFade').call(this, {duration: 10}).then(() => {
    return animate(this.newElement, {scaleX: 1.4, scaleY: 1.4}).then(() => {
      return animate(this.newElement, {scaleX: 1, scaleY: 1});
    })
  });
}
