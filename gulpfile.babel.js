/*----------------------------------------------*\
    IMPORT PLUGINS
\*----------------------------------------------*/
import babelify from 'babelify';
import browserify from 'browserify';
import colors from 'ansi-colors';
import log from 'fancy-log';
import gulp from 'gulp';
import cleancss from 'gulp-clean-css';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import vinyl from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';


const paths = {
	css: "./assets/css",
    js: "./assets/js",
}

function css(done) {

  gulp.src(paths.css+'/**/*.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(cleancss())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('build/css'))
            .on('end', function(){ log(colors.cyan('CSS processed')); })
  done();
}

function js(done) {

    return browserify(paths.js + '/app.js')
        .transform('babelify', {
            sourceMaps: true
        })
        .bundle()
        .pipe(vinyl('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/js'))
        .on('end', function(){ log(colors.cyan('JS processed')); })


    done();
}

function watchFiles() {
    gulp.watch(paths.css + '/*.scss', css);
    gulp.watch(paths.js + '/*.js', js);
    
}


const buildAll = gulp.parallel(css, js);


export const build = gulp.series(buildAll);
export const watch = gulp.series(buildAll, watchFiles);

export default build;