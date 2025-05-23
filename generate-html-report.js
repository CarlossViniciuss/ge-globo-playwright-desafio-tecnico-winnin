/* eslint-disable @typescript-eslint/no-require-imports */
const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const reportPath = 'cucumber_report.html';

const reportOptions = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: reportPath,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "Platform": "GitHub Actions"
  }
};

reporter.generate(reportOptions);

fs.renameSync(reportPath, 'index.html');

console.log('✅ Cucumber HTML report index.html generated successfully 👍');
