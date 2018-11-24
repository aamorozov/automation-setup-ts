import {NightwatchBrowser} from 'nightwatch';

// const beforeEach = (client: NightwatchBrowser, done: () => void) => {
//   client.maximizeWindow(done);
// };

const afterEach = (client: NightwatchBrowser, done: () => void) => {
  client.end(done);
};

export default afterEach;
