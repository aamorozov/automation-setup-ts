const beforeEach = (client, done) => {
  client.maximizeWindow(done);
};

const afterEach = (client, done) => {
  client.end(done);
};

module.exports = {beforeEach, afterEach};
