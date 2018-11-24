import {NightwatchBrowser, NightwatchTypedCallbackResult} from 'nightwatch';

export function command(
  this: NightwatchBrowser,
  selector: string,
  waitTimeout = 5000,
  abortOnFailure?: boolean,
  callback?: Function
) {
  return new Promise(resolve => {
    this.waitForElementVisible(
      selector,
      waitTimeout,
      abortOnFailure,
      (result: NightwatchTypedCallbackResult<Object>): void => {
        if (result.status === 0 && result.value === false) {
          this.waitForElementPresent(selector, waitTimeout)
            .moveToElement(selector, 0, 0)
            .click(selector, () => resolve());
        } else {
          this.moveToElement(selector, 0, 0).click(selector, () => resolve());
        }
      }
    );
  }).then(() => callback && callback.call(this));
}
