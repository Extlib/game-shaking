var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './',
		}
	});
});

gulp.task('autoprefixer', function () {
	gulp.src('./src/css/*')
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('copyImg', function () {
	gulp.src('./src/img/**/*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('build', ['copyImg', 'autoprefixer']);
gulp.task('default', ['copyImg', 'autoprefixer', 'browser-sync']);