import { helper } from '@ember/component/helper';

export function addQuery([ url ], params = {}) {
  if (!url) {
    return '';
  }
  let q = Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`);
  if (q.length) {
    return `${url}?${q.join('&')}`;
  } else {
    return url;
  }
}

export default helper(addQuery);
