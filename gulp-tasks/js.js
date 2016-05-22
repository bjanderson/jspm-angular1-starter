'use strict'

require('colors')
const gulp = require('gulp')
const exec = require('child_process').exec

gulp.task('lintjs', function (done) {
  exec('npm run lintjs & exit 0', function (error, stdout, stderr) {
    if (error != null) {}
    if (stdout != null) {
      stdout = stdout
        .replace(/>[\s\S]*?\| snazzy/g, '')
      if (stdout.replace(/\n/g, '') === '') {
        console.log('No lintjs errors'.green)
      } else {
        console.log(('\nlintjs\n' + stdout.replace(/\n\n\n\n/, '')).yellow)
      }
    }
    done()
  })
})
