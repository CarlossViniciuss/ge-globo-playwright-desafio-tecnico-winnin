const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: 'cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Test Environment": "CI/CD",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Automated"
  }
};

reporter.generate(options);
