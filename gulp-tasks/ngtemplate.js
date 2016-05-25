'use strict'

const gulp = require('gulp')
const htmlMin = require('gulp-htmlmin')
const ngTemplate = require('gulp-ng-template')
const htmlMinOptions = {
  removeComments: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  collapseInlineTagWhitespace: true
}

gulp.task('ngtemplate', function () {
  return gulp.src(['client/app/**/*.tpl.html'])
    .pipe(htmlMin(htmlMinOptions))
    .pipe(ngTemplate({
      moduleName: 'HTMLTemplates',
      standalone: true,
      filePath: 'app/modules/html_templates/html_templates.module.js'
    }))
    .pipe(gulp.dest('client'))
})
