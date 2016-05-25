'use strict'

const gulp = require('gulp')
const spawn = require('child_process').spawn

gulp.task('serve', ['less', 'lintjs', 'ngtemplate', 'run-unit-tests'], function () {
  gulp.watch('client/app/**/*.js', ['lintjs'])
  gulp.watch('client/app/**/*.less', ['less'])
  gulp.watch('client/app/**/*.tpl.html', ['ngtemplate'])

  spawn('npm', ['start'], {stdio: 'inherit'})
})
