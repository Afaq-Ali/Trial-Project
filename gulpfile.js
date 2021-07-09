var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var dependents = require('gulp-dependents');
var sass = require('gulp-sass');


gulp.task('browserSyncServe', function(cb) {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })

  cb();
})

gulp.task('browsersyncReload', function(cb){
  browserSync.reload();
  cb();
})

gulp.task('sass', function() {
  return gulp.src(['advanced-design/*.{sass,scss}'])
    .pipe(dependents())
    .pipe(sass())
    .pipe(gulp.dest('advanced-design'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function(){
  gulp.watch('advanced-design/**/*.{sass,scss}', gulp.series('sass'));
  gulp.watch('advanced-design/**/*.html', gulp.series('browsersyncReload'));
})

gulp.task('default',
  gulp.series(
    'sass',
    'browserSyncServe',
    'watch',
  )
);
