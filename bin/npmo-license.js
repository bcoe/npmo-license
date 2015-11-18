#!/usr/bin/env node

var argv = require('yargs')
  .usage('$0 <command> [arguments]')
  .option('e', {
    alias: 'email',
    description: 'billing email of npm On-Site license'
  })
  .option('k', {
    alias: 'key',
    description: 'license key associated with On-Site license'
  })
  .help('help')
  .alias('h', 'help')
  .version(require('../package.json').version, 'version')
  .alias('v', 'version')
  .usage('download an up-to-date version of your npm On-Site license')
  .argv
var License = require('../')
var license = new License()
var chalk = require('chalk')

if (argv.email && argv.key) {
  license.userEmail = argv.email.trim()
  license.licenseKey = argv.key.trim()
  license.validateLicense(function (err) {
    if (err) throw err
    console.log(license.license)
  })
} else {
  console.log('enter the license information provided in your signup email:')
  license.interview(function () {
    console.log(JSON.stringify(license.license, null, 2))
  })
}

process.on('uncaughtException', function (err) {
  console.log(chalk.red(err.message + '. most likely you entered an incorrect email or key.'))
})
