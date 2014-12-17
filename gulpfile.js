var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function() {
    // this is the main RequireJS file that will be included in index.html
    gulp.src('src/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', function(e) {
                console.log('Error compiling JavaScript:')
                console.log('\x07',e.message);
                return this.end();
            }))
        .pipe(sourcemaps.write('scripts/maps'))
        .pipe(gulp.dest('dist/js'))

    // now uglify all scripts
    gulp.src('src/js/scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', function(e) {
                console.log('Error compiling JavaScript:')
                console.log('\x07',e.message);
                return this.end();
            }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/js/scripts/'))
        .pipe(connect.reload());

    // same for coffeescript files
    gulp.src('src/js/scripts/*.coffee')
        .pipe(sourcemaps.init())
        .pipe(coffee({
            bare: true
        }))
        .pipe(uglify().on('error', function(e) {
                console.log('Error compiling JavaScript:')
                console.log('\x07',e.message);
                return this.end();
            }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/js/scripts/'))
        .pipe(connect.reload());
});

gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('bower-files', function(){
    return gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*', ['js']);
    gulp.watch('src/scss/*.scss', ['scss']);
    gulp.watch('src/index.html', ['html']);
});

gulp.task('server', function() {
    gulp.start('default');
    connect.server({
       root: 'dist',
       livereload: true
    });
    gulp.start('watch');
});

gulp.task('default', ['bower-files', 'js', 'scss', 'html']);
