export function command(selector, callback) {
  return new Promise(resolve => {
    this.waitForElementVisible(selector, 5000, result => {
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
