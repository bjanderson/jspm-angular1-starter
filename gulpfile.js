'use strict'

const gulp = require('gulp')
const requireDir = require('require-dir')
const gulpTasks = './gulp-tasks'

requireDir(gulpTasks)

gulp.task('default', ['serve'])
