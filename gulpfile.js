var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('coffee', function() {
    return gulp.src('devel/js/*.coffee')
        .pipe(coffee())
        .pipe(concat('main.js').on('error', function(error){console.log(error)}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('bower-files', function(){
    return gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('devel/js/*.coffee', ['coffee']);
});

gulp.task('default', ['bower-files', 'coffee']);
