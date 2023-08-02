var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var paths = {
  src: {
    css:    ['./src/css/libs/*.css', './src/css/**/*.styl', 'src/css/**/*.css'],
    jsx:    ['./src/jsx/**/*.jsx'], //Src JS files on which to watch
    appJs:  ['./src/jsx/App.jsx'], //Main JS file, browserify finds the deps
    html:   ['./src/*.html']
  },
  dest: {
    dist: './dist',
    css: './dist/css',
    js: './dist/js'
  }
};

gulp.task('clean:css', function(done) {
  del(['./dist/css/**/*.css'], done);
});

gulp.task('clean:js', function(done) {
  del(['./dist/js/**/*.js'], done);
});

gulp.task('clean:html', function(done) {
  del(['./dist/*.html'], done);
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src(paths.src.css)
    .pipe(stylus())
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('jsx', ['clean:js'], function () {
  browserify({
    entries: paths.src.appJs,
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(paths.dest.js));
});

gulp.task('html', ['clean:html'], function(){
  gulp.src(paths.src.html)
  .pipe(gulp.dest(paths.dest.dist));
});

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.src.css, ['css']);
  gulp.watch(paths.src.jsx, ['jsx']);
  gulp.watch(paths.src.html, ['html']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'css', 'jsx', 'html']);
