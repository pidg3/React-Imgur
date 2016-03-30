var gulp = require('gulp');

// allows use of browserify directly without having to download additional plugin
var source = require('vinyl-source-stream');

// allows use of 'require' tags in the browser
// will automatically browse syntax tree and include everything in correct order
// (already have them in NPM, which is why they can be used already in gulpfile)
var browserify = require('browserify');

// speeds up browserify bundling process once initial bundle is complete
var watchify = require('watchify');

// needed to translate JSX/ES6 as part of build process
var babelify = require('babelify');

// for error notifications in code editor
var notifier = require('node-notifier');

// for live reload
var server = require('gulp-server-livereload');

// for compilation and build of dist files
var concat = require('gulp-concat');
var sass = require('gulp-sass');

// error notification in the code editor
var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

// bundle main.js using browersify
var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  // transform: babelify (with required presets for react/es6) replaces obsolete reactify
  transform: [[babelify, {presets: ['es2015', 'react']}]],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));
function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
}
bundler.on('update', bundle);

// listen for changes and rebuild
gulp.task('build', function() {
  bundle();
});

// livereload server
gulp.task('serve', function() {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true);
          } else if(/style.css/.test(filePath)){
            cb(true);
          }
        }
      },
      open: true
    }));
});

// compile css from sass
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

// watch for sass changes and rebuild if needed
// this is separate to main browserify build process for jsx files
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
