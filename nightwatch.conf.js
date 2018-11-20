module.exports = {
  src_folders: ['./tests/'],
  output_folder: './reports',
  custom_commands_path: './commands',
  custom_assertions_path: './assertions',
  page_objects_path: './pages',
  globals_path: '',
  disable_colors: false,
  screenshots: {
    enabled: true,
    path: './screenshots'
  },
  request_timeout_options: {
    timeout: 60000,
    retry_attempts: 5
  },
  webdriver: {
    start_process: false,
    host: 'localhost',
    cli_args: ['--log', 'debug'],
    log_path: './logs'
  },

  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        port: 9515,
        server_path: require('chromedriver').path
      },
      desiredCapabilities: {
        browserName: 'chrome',
        acceptInsecureCerts: true
      }
    },
    firefox: {
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: require('geckodriver').path
      },
      desiredCapabilities: {
        browserName: 'firefox',
        acceptInsecureCerts: true
      }
    }
  }
};
