var gulp = require('gulp');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

var plugins = require('gulp-load-plugins')();
//默认任务
gulp.task('default',['less_','reload']);
//编译less
gulp.task('less_',function () {
    gulp.src('lesstest/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
})
//压缩图片
gulp.task('compressimg',function(){
    return gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'));
})
//监听
gulp.task('reload', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    })

    gulp.watch("css/*.css").on("change", browserSync.reload)
    gulp.watch("HTML/*.html").on("change", browserSync.reload)
})

//测试过了，都能用，测试文件删了