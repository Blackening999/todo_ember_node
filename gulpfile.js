var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var handlebars = require('gulp-ember-handlebars');
var myth       = require('gulp-myth');
var hint       = require('gulp-jshint');
var concat     = require('gulp-concat');
var cache      = require('gulp-cache');
var gif        = require('gulp-if');
var uglify     = require('gulp-uglify');

var debug = process.env.NODE_ENV !== 'production';

gulp.task('hint', function () {
	return gulp.src('assets/**/*.js')
		.pipe(hint());
});

gulp.task('scripts', ['hint', 'templates'], function () {
	var ember = debug ? 'ember.js' : 'ember.prod.js';
	return gulp.src('assets/js/app.js')
		.pipe(browserify({
			debug: debug,
			shim: {
				jquery: {
					path: 'bower_components/jquery/dist/jquery.js',
					exports: '$'
				},
				handlebars: {
					path: 'bower_components/handlebars/handlebars.js',
					exports: 'Handlebars'
				},
				templates: {
					path: 'builds/templates.js',
					exports: 'Ember.TEMPLATES'
				},
				ember: {
					path: 'bower_components/ember/' + ember,
					exports: 'ember',
					depends: {
						handlebars: 'Handlebars',
						jquery: '$'
					}
				}
			}
		}))
		.on('prebundle', function (bundle) {
			bundle.add('../../bower_components/ember/' + ember);
			bundle.add('../../builds/templates.js');
		})
		.pipe(gif(!debug, uglify()))
		.pipe(gulp.dest('builds/js'));
});

gulp.task('templates', function () {
	return gulp.src('assets/**/*.hbs')
		.pipe(cache(handlebars({
			outputType: 'cjs',
			templateRoot: 'assets/templates/',
			processName: function (name) {
				name = name.split('/').slice(1).join('/').replace(/\.hbs/, '');
				return name;
			}
		})))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('builds'));
});

gulp.task('styles', function () {
	return gulp.src('assets/css/master.css')
		.pipe(myth())
		.pipe(gulp.dest('builds/css'));
});

gulp.task('default', ['styles', 'scripts'], function () { });

gulp.task('watch', function () {
	gulp.watch('assets/**/*.js', ['scripts']);
	gulp.watch('assets/**/*.hbs', ['scripts']);
	gulp.watch('assets/**/*.css', ['styles']);
});