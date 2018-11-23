export function command(selector, waitTimeout = 5000, callback) {
  return new Promise(resolve => {
    this.waitForElementVisible(selector, waitTimeout, result => {
      if (result.status === 0 && result.value === 'false') {
        this.waitForElementPresent(selector)
          .moveToElement(selector, 0, 0)
          .click(selector, () => resolve());
      }
    });
  }).then(() => {
    if (callback && typeof callback === 'function') {
      callback.call(this);
    }
  });
}
