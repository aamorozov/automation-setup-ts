import {NightwatchBrowser, NightwatchCallbackResult} from 'nightwatch';

export function command(
  this: NightwatchBrowser,
  input: string,
  waitTimeout = 5000,
  data: string,
  abortOnFailure: boolean,
  callback?: Function
): Promise<void> {
  return new Promise(resolve => {
    this.waitForElementVisible(
      input,
      waitTimeout,
      (abortOnFailure = false),
      (result: NightwatchCallbackResult): void => {
        if (result.status === 0 && result.value === false) {
          this.waitForElementPresent(input, waitTimeout, abortOnFailure)
            .moveToElement(input, 0, 0)
            .click(input)
            .clearValue(input)
            .setValue(input, data)
            .getValue(input, res => this.assert.equal(res.value, `${data}`))
            .pause(500, () => resolve());
        }
      }
    );
  }).then(() => {
    if (callback && typeof callback === 'function') {
      callback.call(this);
    }
  });
}
