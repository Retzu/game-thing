var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');

gulp.task('js', function() {
    gulp.src('devel/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'))
        .pipe(connect.reload());
});

gulp.task('bower-files', function(){
    return gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('devel/js/*.js', ['js']);
});

gulp.task('server', function() {
    gulp.start('js');
    gulp.start('coffee')
    connect.server({
       root: 'public',
       livereload: true
    });
    gulp.start('watch');
});

gulp.task('default', ['bower-files', 'js', 'coffee']);
