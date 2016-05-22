'use strict'

const gulp = require('gulp')
const spawn = require('child_process').spawnSync

gulp.task('run-unit-tests', function (done) {
  spawn('npm', ['test', '--', '-R', 'dot'], {stdio: 'inherit'})
  done()
})
