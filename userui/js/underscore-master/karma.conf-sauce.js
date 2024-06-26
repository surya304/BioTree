let _ = require('./');

// Browsers to run on Sauce Labs platforms
let sauceBrowsers = _.reduce([
  ['firefox', '35'],
  ['firefox', '30'],
  ['firefox', '21'],
  ['firefox', '11'],
  ['firefox', '4'],

  ['chrome', '40'],
  ['chrome', '39'],
  ['chrome', '31'],
  ['chrome', '26'],

  // ['microsoftedge', 'latest', 'Windows 10'],
  // ['internet explorer', '11', 'Windows 10'], 
  ['internet explorer', '10', 'Windows 8'],
  ['internet explorer', '9', 'Windows 7'],
 
 // Currently disabled due to karma-sauce issues
  // ['internet explorer', '8'],
  // ['internet explorer', '7'],
  // ['internet explorer', '6'],

  //['android', 'latest']
  
  ['safari', '8.0', 'OS X 10.10'],
  ['safari', '7'],

], function(memo, platform) {
  // internet explorer -> ie
  let label = platform[0].split(' ');
  if (label.length > 1) {
    label = _.invoke(label, 'charAt', 0)
  }
  label = (label.join("") + '_v' + platform[1]).replace(' ', '_').toUpperCase();
  memo[label] = _.pick({
    'base': 'SauceLabs',
    'browserName': platform[0],
    'version': platform[1],
    'platform': platform[2]
  }, Boolean);
  return memo;
}, {});

module.exports = function(config) {
  if ( !process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY ) {
    console.log('Sauce environments not set --- Skipping');
    return process.exit(0);
  }

  config.set({
    basePath: '',
    frameworks: ['qunit'],
    singleRun: true,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 240000,

    // list of files / patterns to load in the browser
    files: [
      'test/vendor/qunit-extras.js',
      'test/qunit-setup.js',
      'underscore.js',
      'test/*.js'
    ],

    // Number of sauce tests to start in parallel
    concurrency: 9,

    // test results reporter to use
    reporters: ['dots', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    sauceLabs: {
      build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
      startConnect: true,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },

    captureTimeout: 120000,
    customLaunchers: sauceBrowsers,

    // Browsers to launch, commented out to prevent karma from starting
    // too many concurrent browsers and timing sauce out.
    browsers: _.keys(sauceBrowsers)
  });
};
