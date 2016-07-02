'use strict';

let gulp = require('gulp');
let scss = require('gulp-scss');
let jade = require('gulp-jade');
let browserify = require('gulp-browserify');

//todo:gulp-babel

let paths = {
    jade: './src/views/*.jade',
    styles: './src/style*.scss',
    scripts: './src/scripts/*.js'
};

gulp.task('jade', () => {
    gulp
        .src(paths.jade)
        .pipe(jade())
        .pipe(gulp.dest('./dist/views'))
});

gulp.task('scripts', () => {
    gulp
        .src('./src/scripts/background.js')
        .pipe(browserify({
            
        }))
        .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('default', ['jade', 'scripts']);

// gulp.task('scss', () => {
//     gulp
//         .src(paths.styles)
//         .pipe(scss())
//         .pipe(gulp.dest('./dist/styles'));
// });
//
// gulp.task('watch', () => {
//     gulp.watch(paths.jade, ['jade']);
//     gulp.watch(paths.styles, ['scss']);
// });
//
// gulp.task('default', ['jade', 'scss', 'watch']);
