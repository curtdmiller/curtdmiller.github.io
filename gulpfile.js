var del = require('del');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');

var server = browserSync.create();

var paths = {
    html: {
        src: 'index.html'
    },
    styles: {
        src: 'css/**/*.scss',
        normalize: 'node_modules/normalize.css/normalize.css',
        dest: 'css/'
    },
    scripts: {
        src: 'js/**/*.js'
    },
    images: {
        src: 'img/**/*',
        dest: 'img-min/'
    },
};

function imgClean(){
    return del([ 'img-min' ])
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(rename(function(path){
            path.basename += '-min';
        }))
        // .pipe(rename(function(path){
        //     path.dirname = '';
        // }))
        .pipe(gulp.dest(paths.images.dest));
}

function styles() {
    return gulp.src(paths.styles.src, { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

gulp.watch(paths.html.src, gulp.series(reload));
gulp.watch(paths.styles.src, gulp.series(styles, reload));
gulp.watch(paths.scripts.src, gulp.series(reload));

exports.imgClean = imgClean;
exports.images = images;
exports.styles = styles;
exports.serve = serve;

var build = gulp.series(imgClean, gulp.parallel(images, styles), serve);
gulp.task('build', build);

gulp.task('default', build);
