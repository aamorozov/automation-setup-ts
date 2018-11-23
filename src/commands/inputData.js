export function command(input, waitTimeout = 5000, data, callback) {
  return new Promise(resolve => {
    this.waitForElementVisible(input, waitTimeout, result => {
      if (result.status === 0 && result.value === 'false') {
        this.waitForElementPresent(selector, waitTimeout)
          .moveToElement(selector, 0, 0)
          .click(input)
          .clearValue(input)
          .setValue(input, data)
          .getValue(input, res => this.assert.equal(res.value, `${data}`))
          .pause(500, () => resolve());
      }
    }).then(() => {
      if (callback && typeof callback === 'function') {
        callback.call(this);
      }
    });
  });
}
