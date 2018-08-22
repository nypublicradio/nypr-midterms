import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['page', 'wnyctag', 'gothamisttag'],
  page: 1,
  wnyctag: 'news',
  gothamisttag: '@wnyc'
});
