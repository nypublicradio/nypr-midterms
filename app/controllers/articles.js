import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import moment from 'moment';

export default Controller.extend({
  queryParams: ['page'],
  page: null,

  stories: sort('results', function(a, b) {
    return moment(b.newsdate) - moment(a.newsdate);
  }),
});
