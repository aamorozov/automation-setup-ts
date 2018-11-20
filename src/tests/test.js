export default client => {
  client.url('https://www.google.com');
  client.waitForElementVisible();
  client.end();
};
