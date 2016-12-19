var gulp     = require('gulp'),
    clean    = require('gulp-clean'),
    imageMin = require('gulp-imagemin');

/**
 * Paths to the directories.
 */
const paths = {
    imgsSource: './imgs_raw/**/*',
    imgsDist:   './img/'
};

/**
 * Run all the tasks inside the start function, after clean and copy tasks.
 */
gulp.task('default', ['copy'], () => gulp.start('imagemin'));

/**
 * Copy all files from the imgsSource directory to the imgsDist directory.
 */
gulp.task('copy', ['clean'], () => gulp.src([
    paths.imgsSource
]).pipe(gulp.dest(paths.imgsDist)));

/**
 * Remove the 'img' directory.
 */
gulp.task('clean', () => gulp.src(paths.imgsDist).pipe(clean()));

/**
 * Minify all the images and save in the imgsDist directory.
 */
gulp.task('imagemin', () => gulp.src(paths.imgsDist + '**/*')
    .pipe(imageMin())
    .pipe(gulp.dest(paths.imgsDist)));
