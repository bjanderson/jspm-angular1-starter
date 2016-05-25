'use strict'

const gulp = require('gulp')
const inject = require('gulp-inject')
const less = require('gulp-less')
const LessAutoPrefixPlugin = require('less-plugin-autoprefix')
const LessCleanCssPlugin = require('less-plugin-clean-css')
const rename = require('gulp-rename')

const lessAutoprefix = new LessAutoPrefixPlugin({
  browsers: ['last 2 versions']
})

const lessCleanCss = new LessCleanCssPlugin({
  advanced: true
})

gulp.task('less', function () {
  return gulp.src(['client/app/app.less'])
    .pipe(
      inject(gulp.src(['app/**/*.less'], {
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
      plugins: [lessAutoprefix, lessCleanCss]
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('client'))
})
