export function initialize(app) {
  const isTouch = typeof FastBoot === 'undefined' ? ('ontouchend' in window) : false;
  app.register('is-touch:main', isTouch, {instantiate: false});
  app.inject('controller', 'isTouch', 'is-touch:main');
}

export default {
  initialize
};
