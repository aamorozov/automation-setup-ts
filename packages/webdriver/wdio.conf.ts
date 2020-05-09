import SlackReporter from './src/reporters/SlackReporter';

const slackReporter = new SlackReporter({});

const isCi = process.env.CI;
const isLocal = process.env.LOCAL;

function setLoggingLevel() {
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  if (isCi) {
    return 'info';
  }
  if (isLocal) {
    'verbose';
  }

  return 'info';
}

const config = {
  runner: 'local',
  path: '/',
  specs: ['./src/__tests__/**/*.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
    },
  ],

  logLevel: setLoggingLevel(),
  logLevels: {
    webdriver: setLoggingLevel(),
  },
  bail: 0,
  baseUrl: process.env.BASE_URL || 'http://localhost',
  waitforTimeout: process.env.TEST_WAIT_TIMEOUT || 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  specFileRetries: 1,
  reporters: [
    'spec',
    [
      SlackReporter,
      {
        outputDir: './',
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    require: ['@babel/register', 'tsconfig-paths/register'],
  },

  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function () {
    require('ts-node').register({
      files: true,
      project: `${__dirname}/tsconfig.json`,
    });
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  // beforeSuite: function (suite) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  // beforeTest: function (test, context) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed }) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine).
   */
  // afterTest: function(test, context, { error, result, duration, passed }) {
  // },

  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  // onComplete: function(exitCode, config, capabilities, results) {
  // },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
  onPrepare: process.env.SLACK_WEBHOOK_URL
    ? async function (config, capabilities) {
        await slackReporter.sendPreMessage(this.specs);
      }
    : undefined,
  onComplete: process.env.SLACK_WEBHOOK_URL
    ? async function (config, capabilities) {
        await slackReporter.sendPostMessage(this.specs);
      }
    : undefined,
};

export {config};
