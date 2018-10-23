import moment from 'moment';

export function initialize() {
  moment.updateLocale('en', {
    meridiem: function(hour/*, minute, isLowerCase*/) {
      if (hour < 12) {
        return 'a.m.';
      } else {
        return 'p.m.';
      }
    }
  });
}

export default {
  initialize
};
