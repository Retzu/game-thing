var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');

gulp.task("bower-files", function(){
    return gulp.src(mainBowerFiles())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('default', ['bower-files']);
