import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: 'section',
  classNames: ['read-section'],
  sorted: computed('wnyc', 'gothamist', function() {
    let wnyc = this.wnyc || [];
    let gothamist = this.gothamist || [];
    let stories = wnyc.toArray().concat(gothamist.toArray());
    return stories.sort((a, b) => moment(b.newsdate) - moment(a.newsdate));
  })
});
