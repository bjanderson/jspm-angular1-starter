'use strict'

const gulp = require('gulp')
const exec = require('child_process').exec
const fs = require('fs')
const ngAnnotate = require('gulp-ng-annotate')
const rename = require('gulp-rename')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const runSequence = require('run-sequence')
const uglify = require('gulp-uglify')

gulp.task('build', function (done) {
  runSequence(
    'run-unit-tests',
    'build:clean',
    [
      'build:css',
      'build:html',
      'build:img',
      'build:js'
    ],
    'build:rev',
    'build:cleanup',
    done
  )
})

gulp.task('build:clean', function (done) {
  exec('rm -rf dist && mkdir dist', function (err, stdout) {
    if (err != null) { throw err }
    if (stdout != null) { console.log(stdout) }
    done()
  })
})

gulp.task('build:cleanup', function (done) {
  exec('rm ./dist/app.js ./dist/app.min.js ./dist/main.min.css ./dist/rev-manifest.json', function (err, stdout) {
    if (err != null) { throw err }
    if (stdout != null) { console.log(stdout) }
    done()
  })
})

gulp.task('build:css', ['less'], function (done) {
  exec('cp client/main.min.css dist/main.min.css', function (err, stdout) {
    if (err != null) { throw err }
    if (stdout != null) { console.log(stdout) }
    done()
  })
})

gulp.task('build:html', ['copy:articles'], function (done) {
  fs.readFile('client/index.html', 'utf8', function (err, data) {
    if (err != null) { throw err }

    let result = data
      .replace(/<!--DEV[\s\S]*?DEV-->/g, '')
      .replace('<!--PROD', '')
      .replace('PROD-->', '')
      .replace(/\ \ +/g, '')
      .replace(/(\n\r|\n|\r)/g, '')

    fs.writeFile('./dist/index.html', result, 'utf8', function (err) {
      if (err != null) { throw err }
      done()
    })
  })
})

gulp.task('copy:articles', function (done) {
  exec('mkdir -p dist/app/articles/content && cp -R client/app/articles/content/* dist/app/articles/content/', function (err) {
    if (err != null) { throw err }
    done()
  })
})

gulp.task('build:img', ['build:favicon'], function (done) {
  exec('mkdir -p dist/images && cp -R client/images/* dist/images/', function (err) {
    if (err != null) { throw err }
    done()
  })
})

gulp.task('build:favicon', function (done) {
  exec('cp client/favicon.ico dist/favicon.ico', function (err) {
    if (err != null) { throw err }
    done()
  })
})

gulp.task('build:js', ['bundle:js'], function () {
  return gulp.src('./dist/app.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('bundle:js', ['fixHtmlTempatesJS', 'lintjs'], function (done) {
  exec('cd client && jspm bundle-sfx app/app.js ../dist/app.js --skip-source-maps',
    function (err, stdout) {
      if (err != null) { throw err }
      if (stdout != null) { console.log(stdout) }
      done()
    }
  )
})

gulp.task('fixHtmlTempatesJS', ['ngtemplate'], function (done) {
  fs.readFile('client/app/html_templates/html_templates.module.js', 'utf8', function (err, data) {
    if (err != null) { throw err }

    let result = "'use strict';import angular from 'angular';" + data

    fs.writeFile('client/app/html_templates/html_templates.module.js', result, 'utf8', function (err) {
      if (err != null) { throw err }
      done()
    })
  })
})

gulp.task('build:rev', ['build:revfiles'], function () {
  const manifest = gulp.src('./dist/rev-manifest.json')
  return gulp.src('./dist/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:revfiles', function () {
  return gulp.src(['./dist/app.min.js', './dist/main.min.css'])
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist'))
})
