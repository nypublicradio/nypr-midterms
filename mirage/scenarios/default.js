export default function(server) {

  if (window.localStorage.shutdownMirage) {
    server.shutdown();
  }

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
}
