'use strict'

const gulp = require('gulp')
const spawn = require('child_process').spawnSync

gulp.task('run-unit-tests', function (done) {
  spawn('npm', ['test', '--', '-R', 'dot'], {stdio: 'inherit'})
  done()
})

gulp.task('run-e2e-tests', function (done) {
  //spawn('npm', ['start'], {stdio: 'inherit'})

  spawn('webdriver-manager', ['start'], {stdio: 'inherit'})

  spawn('protractor', [], {stdio: 'inherit'})
})
