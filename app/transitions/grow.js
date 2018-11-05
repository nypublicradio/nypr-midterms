import {
  animate,
} from 'liquid-fire';

const OPS = {
  duration: 200
};

export default function grow() {
  this.lookup('crossFade').call(this, {duration: 10}).then(() => {
    return animate(this.newElement, {scaleX: 1.2, scaleY: 1.2}, OPS).then(() => {
      return animate(this.newElement, {scaleX: 1, scaleY: 1}, OPS);
    })
  });
}
