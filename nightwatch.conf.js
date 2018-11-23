require('@babel/register');

const path = require('path');

const GECKO_DRIVER_PATH = require('geckodriver').path;
const CHROME_DRIVER_PATH = require('chromedriver').path;
const SELENIUM_SERVER_PATH = require('selenium-server').path;
const TESTS_PATH = path.resolve(__dirname, 'src', 'tests');
const SERVER_LOGS_PATH =
  process.env.SERVER_LOGS_PATH ||
  path.resolve(__dirname, 'generatedFiles', 'logs');
const SCREENSHOTS_PATH =
  process.env.SCREENSHOTS_PATH ||
  path.resolve(__dirname, 'generatedFiles', 'screenshots');
const REPORTS_PATH =
  process.env.REPORTS_PATH ||
  path.resolve(__dirname, 'generatedFiles', 'reports');
const GLOBALS_PATH =
  process.env.GLOBALS || path.resolve(__dirname, 'src', 'globals.js');
const LAUNCH_URL = process.env.LAUNCH_URL || '';

const DEFAULT_CONFIG = {
  start_process: false,
  host: 'localhost',
  cli_args: ['--log', 'debug'],
  log_path: SERVER_LOGS_PATH
};

const CHROME_CONFIG = {
  webdriver: {
    start_process: true,
    port: 9515,
    server_path: CHROME_DRIVER_PATH
  },
  desiredCapabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true
  }
};

const FIREFOX_CONFIG = {
  webdriver: {
    start_process: true,
    port: 4444,
    server_path: GECKO_DRIVER_PATH
  },
  desiredCapabilities: {
    browserName: 'firefox',
    acceptInsecureCerts: true
  }
};

const SELENIUM_CONFIG = {
  selenium: {
    start_process: true,
    host: 'localhost',
    port: 4444,
    server_path: SELENIUM_SERVER_PATH,
    cli_args: {
      'webdriver.gecko.driver': GECKO_DRIVER_PATH,
      'webdriver.chrome.driver': CHROME_DRIVER_PATH
    }
  },

  desiredCapabilities: {
    browserName: 'firefox',
    acceptSslCerts: true
  }
};

module.exports = {
  src_folders: TESTS_PATH,
  output_folder: REPORTS_PATH,
  custom_commands_path: './src/commands',
  // custom_assertions_path: './src/assertions',
  // page_objects_path: './src/pages',
  globals_path: GLOBALS_PATH,
  launch_url: LAUNCH_URL,
  test_workers: {
    enabled: false,
    workers: 10
  },
  parallel_process_delay: 1000,
  live_output: false,
  detailed_output: true,
  silent: true,
  output: true,
  disable_colors: false,
  log_screenshot_data: false,
  screenshots: {
    enabled: true,
    on_failure: true,
    on_error: true,
    path: SCREENSHOTS_PATH
  },
  end_session_on_fail: true,
  skip_testcases_on_fail: true,
  request_timeout_options: {
    timeout: 60000,
    retry_attempts: 5
  },
  asyncHookTimeout: 30000,
  waitForConditionTimeout: 30000,
  webdriver: DEFAULT_CONFIG,
  test_settings: {
    default: CHROME_CONFIG,
    firefox: FIREFOX_CONFIG,
    selenium: SELENIUM_CONFIG
  }
};
