import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | gothamist story', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('gothamist-story');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('gothamist-story', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

  test('it serializes query responses', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('gothamist-story');

    const GOTH_STORIES = [{
      "permalink": "http://gothamist.com/2018/08/10/worry_over_carriage_horses_welfare.php",
      "thumbnail_640": "http://gothamist.com/assets_c/2018/08/2018_08_carriagehorse-thumb-640xauto-1023033.jpg",
      "excerpt_pretty": "Animal rights advocates say that horses are being forced to working in unbearable conditions.",
      "thumbnail_300": "http://gothamist.com/assets_c/2018/08/2018_08_carriagehorse-thumb-300x300-1023033.jpg",
      "title": "Advocates Want Carriage Horses Off The Streets During Heat Advisories",
      "author_nickname": "Mara Silvers",
      "id": 703520,
      "thumbnail_105": "http://gothamist.com/assets_c/2018/08/2018_08_carriagehorse-thumb-105x105-1023033.jpg",
      "authored_on": "20180810131452",
    },
    {
      "permalink": "http://gothamist.com/2018/08/10/depressing_subway_poem_commuters_lament.php",
      "thumbnail_640": "http://gothamist.com/assets_c/2018/08/commuterpoem-20-thumb-640xauto-1023032.jpg",
      "title": "Thanks MTA For The Depressing AF Poem That's Been In This Subway Tunnel Since The '90s",
      "author_nickname": "Jen Carlson",
      "authored_on": "20180810114500",
      "excerpt_pretty": "The poem was inspired by the 1920s Burma-Shave ad roadside campaign.",
      "thumbnail_300": "http://gothamist.com/assets_c/2018/08/commuterpoem-20-thumb-300x300-1023032.jpg",
    },
    {
      "authored_on": "20180810083800",
      "permalink": "http://gothamist.com/2018/08/10/raccoons_dogs_central_park.php",
      "thumbnail_640": "http://gothamist.com/assets_c/2018/08/2018_08_raccooncub-thumb-640xauto-1023017.jpg",
      "excerpt_pretty": "85 raccoons show signs of distemper.",
      "thumbnail_300": "http://gothamist.com/assets_c/2018/08/2018_08_raccooncub-thumb-300x300-1023017.jpg",
      "title": "City Warns Dog Owners To Keep Pups On Leash In Central Park Due To Raccoons With Distemper Virus",
      "author_nickname": "Jen Chung",
    }];

    let response = serializer.normalizeQueryResponse(store, null, GOTH_STORIES);
    let [ story ] = response.data;

    assert.equal(response.data.length, 3, 'should serialize 3 stories');
    assert.deepEqual(Object.keys(story).sort(), ['type', 'id', 'attributes', 'relationships'].sort(), 'should serialize a JSON API document');

    assert.deepEqual(Object.keys(story.attributes).sort(), [
      'author',
      'authoredOn',
      // 'producingOrganizations', static value in instantiated record
      'tease',
      'thumbnailLarge',
      'thumbnailSmall',
      'title',
      'url',
    ].sort());
  });
});
