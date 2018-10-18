import { helper } from '@ember/component/helper';

const DEFAULTS = {
  delimiter: ','
};

export function delimit([ number ], options = DEFAULTS) {
  options = {...DEFAULTS, ...options};
  if (options.delimiter === ',') {
    return Number(number).toLocaleString();
  } else {
    return number;
  }
}

export default helper(delimit);
