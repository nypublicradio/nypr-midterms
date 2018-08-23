export function initialize(/* appInstance */) {
  if (typeof FastBoot === 'undefined') {
    // hearken looks for the requirejs global
    // ember's requirejs does not define a config method, which hearken expects
    // removing this at run time does not seem to have any drawbacks ¯\_(ツ)_/¯ 
    window.requirejs = undefined;
  }
}

export default {
  initialize
};
