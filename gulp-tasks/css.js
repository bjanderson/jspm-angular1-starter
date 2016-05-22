'use strict'

const gulp = require('gulp')
const inject = require('gulp-inject')
const less = require('gulp-less')
const LessAutoPrefixPlugin = require('less-plugin-autoprefix')
const LessCleanCssPlugin = require('less-plugin-clean-css')
const rename = require('gulp-rename')

const less_autoprefix = new LessAutoPrefixPlugin({
  browsers: ['last 2 versions']
})

const less_clean_css = new LessCleanCssPlugin({
  advanced: true
})

gulp.task('less', function () {
  return gulp.src(['client/main.less'])
    .pipe(
      inject(gulp.src(['**/*.less', '!jspm_packages{,/**}'], {
        read: false,
        cwd: 'client'
      }), {
        starttag: '/* inject:less-imports */',
        endtag: '/* endinject */',
        relative: true,
        transform: function (filepath) {
          return '@import "./' + filepath + '";'
        }
      })
    )
    .pipe(less({
      plugins: [less_autoprefix, less_clean_css]
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('client'))
})
