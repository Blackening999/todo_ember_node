var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var myth       = require('gulp-myth');
var hint       = require('gulp-jshint');
var concat     = require('gulp-concat');
var cache      = require('gulp-cache');
var gif        = require('gulp-if');
var uglify     = require('gulp-uglify');
var imagemin   = require('gulp-imagemin');

var paths = {
	scripts: ['assets/js/**/*.js'],
	images: ['assets/images/**/*']
}

var debug = process.env.NODE_ENV !== 'production';

gulp.task('images', function() {
	return gulp.src(paths.images)
		// Pass in options to the task
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('builds/images'));
});

gulp.task('hint', function () {
	return gulp.src('assets/js/**/*.js')
		.pipe(hint());
});

gulp.task('bootstrap', function() {
	return gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
		.pipe(myth())
		.pipe(gulp.dest('builds/css'));
});

gulp.task('concat', function() {
	return gulp.src(paths.scripts)
		.pipe(concat('all.js'))
		.pipe(gulp.dest('assets/prebuild'));
});

gulp.task('scripts', ['hint', 'templates', 'concat'], function () {
	var ember, ember_data;
	if (debug) {
		ember = 'ember.js';
		ember_data = 'ember-data.js';
	} else {
		ember = 'ember.prod.js';
		ember_data = 'ember-data.prod.js';
	}
	return gulp.src('assets/prebuild/all.js')
		.pipe(browserify({
			debug: debug,
			shim: {
				jquery: {
					path: 'bower_components/jquery/jquery.js',
					exports: '$'
				},
				handlebars: {
					path: 'bower_components/handlebars/handlebars.js',
					exports: 'Handlebars'
				},
				bootstrap: {
					path: 'bower_components/bootstrap/dist/js/bootstrap.js',
					exports: 'bootstrap',
					depends: {
						jquery: '$'
					}
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
				},
				ember_data: {
					path: 'bower_components/ember-data/' + ember_data,
					exports: 'DS',
					depends: {
						ember: 'ember',
						handlebars: 'Handlebars'
					}
				}//,
//				localstorage: { //ls-storage
//					path: 'bower_components/ember-localstorage-adapter/localstorage_adapter.js',
//					exports: 'DS.LSAdapter',
//					depends: {
//						ember: 'ember',
//						handlebars: 'Handlebars',
//						ember_data: 'DS'
//					}
//				}
			}
		}))
		.on('prebundle', function (bundle) {
			bundle.add('../../bower_components/ember/' + ember);
			bundle.add('../../bower_components/ember-data/' + ember_data);
			bundle.add('../../builds/templates.js');
		})
		.pipe(gif(!debug, uglify()))
		.pipe(gulp.dest('builds/js'));
});

gulp.task('templates', function(){
	gulp.src(['assets/templates/*.hbs'])
		.pipe(handlebars())
		.pipe(defineModule('node'))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('builds'));
});

gulp.task('styles', function () {
	return gulp.src('assets/css/style.css')
		.pipe(myth())
		.pipe(gulp.dest('builds/css'));
});

gulp.task('default', ['bootstrap', 'styles', 'scripts'], function () { });

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch('assets/**/*.hbs', ['scripts']);
	gulp.watch('assets/**/*.css', ['styles']);
});