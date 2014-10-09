var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('js', function() {
    gulp.src('devel/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('bower-files', function(){
    return gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('devel/js/*.js', ['js']);
});

gulp.task('default', ['bower-files', 'js']);
