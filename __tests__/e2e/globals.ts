import {NightwatchBrowser, NightwatchTestHook} from 'nightwatch';

// const beforeEach = (client: NightwatchBrowser, done: () => void) => {
//   client.maximizeWindow(done);
// };

const afterEach: NightwatchTestHook = (
  client: NightwatchBrowser,
  done: () => void,
) => {
  client.end(done);
};

export default afterEach;
