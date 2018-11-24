import {NightwatchBrowser} from 'nightwatch';

export default (client: NightwatchBrowser) => {
  client.url('https://www.google.com');
  client.waitAndClick('a[href*="store"]');
};
