import reporter from 'cucumber-html-reporter';
import fs from 'fs';

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

// Renomeia para index.html
fs.renameSync(reportPath, 'index.html');

console.log('✅ Cucumber HTML report index.html generated successfully 👍');
