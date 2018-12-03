const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
 
gulp.task('scripts', () =>
  gulp.src('dev/script/main.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('assets'))
)

gulp.task('styles', () =>
  gulp.src('dev/style/app.scss')
  .pipe(sass())
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('assets'))
)

gulp.task('default', gulp.parallel('scripts', 'styles'))