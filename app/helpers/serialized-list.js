import { helper } from '@ember/component/helper';
import { isArray } from '@ember/array';

export function serializedList([ list ], {separator = ', ', and = true, fallback = '', key}) {
  if (!isArray(list)) {
    return list || fallback;
  }
  if (typeof key === 'string') {
    let plucked = list.mapBy(key);
    // check that `key` pulls out values
    if (plucked.every(i => i)) {
      list = plucked;
    }
  }

  if (list.length <= 1 && !fallback) {
    return list;
  } else if (fallback) {
    return fallback;
  }

  let rest = list.slice(0, -1);
  let last = list.slice(-1);

  let joined = [...rest].join(separator);
  if (and === true) {
    return joined.concat(` and ${last}`);
  } else if (and) {
    return joined.concat(`${and}${last}`);
  } else {
    return joined.concat(` ${last}`);
  }
}

export default helper(serializedList);
