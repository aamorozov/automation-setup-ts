import * as NW from "nightwatch";

// merge interfaces with nightwatch types
declare module "nightwatch" {
  export interface NightwatchWebdriverOptions extends NightwatchOptions {
    test_settings: NW.NightwatchTestSettings;
  }
  export interface NightwatchTestSettingScreenshots {
    webdriver?: Object;
  }
  export interface NightwatchCustomCommands {
    inputData(
      this: NW.NightwatchBrowser,
      input: string,
      data: string,
      waitTimeout?: number,
      abortOnFailure?: boolean,
      callback?: Function
    ): NW.NightwatchBrowser;
    waitAndClick(
      this: NW.NightwatchBrowser,
      selector: string,
      waitTimeout?: number,
      abortOnFailure?: boolean,
      callback?: Function
    ): NW.NightwatchBrowser;
  }
  export interface SharedFunctions {
    waitForElementVisible(
      selector: string,
      time?: number,
      abortOnFailure?: boolean,
      callback?: (result: NW.NightwatchTypedCallbackResult<any>) => void,
      message?: string
    ): this;
  }
}
