export default client => {
  client.url('https://www.google.com').waitAndClick('a[href*="store"]');
};
