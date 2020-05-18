import * as chromedriver from 'chromedriver';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import {NightwatchBrowser} from 'nightwatch';
import {promisify} from 'util';

const stopDriver = promisify(chromedriver.stop);

const port = Number(process.env.TEST_PORT) || 8080;

export const generateConfig = (
  webpackConfig: webpack.Configuration,
  providedPort = port,
) => {
  const webpackServer = new WebpackDevServer(webpack(webpackConfig), {
    quiet: true,
    hot: false,
    inline: false,
  });

  const startDriver = (): Promise<void> =>
    new Promise((resolve, reject) => {
      try {
        const childProcess = chromedriver.start();
        if (childProcess && childProcess.stdout) {
          childProcess.stdout.once('data', () => {
            resolve();
          });
        }
      } catch (e) {
        reject(e);
      }
    });

  const startServer = (): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        webpackServer.listen(providedPort, '0.0.0.0', resolve);
      } catch (e) {
        reject(e);
      }
    });

  const startDriverAndServer = (done: () => void): Promise<void> => {
    return Promise.all([startDriver(), startServer()]).then(() => done());
  };

  const stopDriverAndServer = async (done: () => void): Promise<void> => {
    return Promise.all([webpackServer.close(), stopDriver()]).then(() =>
      done(),
    );
  };

  const endBrowserSession = (browser: NightwatchBrowser, done: () => void) =>
    browser.end(done);

  const config = {
    selenium: {
      start_process: false,
    },
    webdriver: {
      start_process: true,
      server_path: 'node_modules/.bin/chromedriver',
      port: 9515,
    },
    src_folders: './tests',
    output_folder:
      process.env.REPORT_DIR || './__tests__/e2e/generatedFiles/reports',
    custom_commands_path: './__tests__/e2e/commands',
    custom_assertions_path: './__tests__/e2e/assertions',
    page_objects_path: './__tests__/e2e/pages',
    globals_path: './globals.js',
    persist_globals: true,
    test_workers: {
      enabled: false,
      workers: 5,
    },
    test_settings: {
      default: {
        launch_url: process.env.LAUNCH_URL || '',
        persist_globals: true,
        selenium_port: 9515,
        selenium_host: 'localhost',
        default_path_prefix: '',
        log_screenshot_data: false,
        silent: false,
        detailed_output: true,
        live_output: false,
        globals: {
          breakpoints: {
            mobile_small: [320, 568],
            mobile_mid: [375, 667],
            mobile_large: [414, 736],
            tablet: [768, 1024],
            tablet_large: [1024, 1366],
            laptop: [1280, 750],
            laptop_large: [1440, 800],
            dekstop: [1600, 900],
            desktop_large: [1920, 970],
          },
          asyncHookTimeout: 30000,
          waitForConditionTimeout: 30000,
          retryAssertionTimeout: 1000,
          before: startDriverAndServer,
          after: stopDriverAndServer,
          afterEach: endBrowserSession,
        },
        screenshots: {
          enabled: true,
          on_failure: true,
          on_error: true,
          path:
            process.env.SCREENSHOTS_DIR ||
            './__tests__/e2e/generatedFiles/screenshots',
        },
        desiredCapabilities: {
          browserName: 'chrome',
          javascriptEnabled: true,
          acceptSslCerts: true,
          chromeOptions: {
            args: ['--no-sandbox', '--window-size=1920,1080'],
          },
        },
      },
      production: {
        launch_url: process.env.PRODUCTION,
      },
      staging: {
        launch_url: process.env.STAGING,
      },
      development: {
        launch_url: process.env.DEVELOPMENT,
      },
      local: {
        launch_url: process.env.LOCAL,
      },
    },
  };
  return config;
};
