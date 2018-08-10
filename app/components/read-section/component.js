import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  sorted: computed('wnyc', 'gothamist', function() {
    let stories = this.wnyc.toArray().concat(this.gothamist.toArray());
    return stories.sort((a, b) => moment(b.newsdate) - moment(a.newsdate));
  })
});
