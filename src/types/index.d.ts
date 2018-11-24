import * as NW from 'nightwatch';

// merge interfaces with nightwatch types
declare module 'nightwatch' {
  export interface NightwatchTestSettingGeneric {
    webdriver: Object;
  }
  export interface NightwatchOptions {
    launch_url: string;
    detailed_output: boolean;
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
}
