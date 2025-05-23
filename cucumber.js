// eslint-disable-next-line no-undef
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/features/support/world.ts',
      'tests/features/support/hooks.ts',
      'tests/features/step_definitions/**/*.ts'
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
      'json:cucumber_report.json',
      '@cucumber/pretty-formatter'
    ],
    language: 'pt'
  }
}
