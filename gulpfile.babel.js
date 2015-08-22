import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import autoprefixer from 'autoprefixer';
import cssnext from 'cssnext';

let {babel, run, rename, jsxcs, postcss} = plugins();

gulp.task('compile:js', ['jscs'], () => {
  return gulp.src('app/scripts/index.es6.js')
             .pipe(babel())
             .pipe(rename('index.js'))
             .pipe(gulp.dest('app'));
});

gulp.task('jscs', () => {
  return gulp.src(['app/scripts/*', 'browser/scripts/*'])
             .pipe(jsxcs({
               preset: 'node-style-guide',
               esnext: true,
             }));
});

gulp.task('compile:css', () => {
  let processors = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnext(),
  ];

  return gulp.src('app/styles/*.css')
             .pipe(postcss(processors))
             .pipe(gulp.dest('browser/styles'));
});

gulp.task('compile', ['compile:css', 'compile:js']);

gulp.task('run', ['default'], () => {
  return run('electron .').exec();
});

gulp.task('default', ['compile']);