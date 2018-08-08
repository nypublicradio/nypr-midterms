import Component from '@ember/component';
import { computed } from '@ember/object';

const SERVICE_MAP = {
  twitter: 'https://twitter.com/',
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/channel/',
  medium: 'https://medium.com/@',
  linkedin: 'https://www.linkedin.com/company/',
  snap: 'https://www.snapchat.com/add/'
};


const SocialLink = Component.extend({
  tagName: 'a',
  classNames: ['share-icons__link'],
  classNameBindings: ['service'],
  attributeBindings: ['href', 'target'],

  username: '',
  href: computed('service', 'username', function() {
    let { username, service } = this;
    // allow passing in absolute URLs
    if (username.match(/^http/)) {
      return username;
    }

    let prefix = SERVICE_MAP[service];
    return `${prefix}${username}`;
  })
});

SocialLink.reopenClass({
  positionalParams: ['service', 'username', 'icon']
});

export default SocialLink;
