"use strict";

var gulp = require("gulp"),
	del = require("del");

var paths = {
	webroot: "./wwwroot/"
};

/*
 * Copy bower files to destination
 */
gulp.task("bower", ["bower:clean"], function() {
	// bootstrap
	gulp.src([
			"bower_components/bootstrap/dist/js/bootstrap*.js",
			"bower_components/bootstrap/dist/css/bootstrap*.css"
			//"bower_components/bootstrap/dist/fonts/*" -- don't think we need these
		], { base: "./bower_components/bootstrap/dist" }) // used "base" option to preserve component file structure
		.pipe(gulp.dest(paths.webroot + "lib/bootstrap"));

	// bootswatch - bootstrap themes
	gulp.src("bower_components/bootswatch/united/bootstrap*.css")
		.pipe(gulp.dest(paths.webroot + "lib/bootswatch/united"));

	// font-awesome
	gulp.src("bower_components/font-awesome/css/font-awesome*.css")
		.pipe(gulp.dest(paths.webroot + "lib/font-awesome"));

	// font-awesome fonts
	gulp.src("bower_components/font-awesome/fonts/*")
		.pipe(gulp.dest(paths.webroot + "lib/fonts"));

	// jquery
	gulp.src("bower_components/jquery/dist/jquery*.js")
		.pipe(gulp.dest(paths.webroot + "lib/jquery"));

	// angular
	gulp.src([
			"bower_components/angular/angular*.js",
			"bower_components/angular-route/angular-route*.js",
			"bower_components/angular-resource/angular-resource*.js",
			"bower_components/angular-animate/angular*.js"
		])
		.pipe(gulp.dest(paths.webroot + "lib/angular"));

	// moment
	gulp.src("bower_components/moment/moment*.js")
		.pipe(gulp.dest(paths.webroot + "lib/moment"));

	// underscore
	gulp.src("bower_components/underscore/underscore*.js")
		.pipe(gulp.dest(paths.webroot + "lib/underscore"));
});

/*
 * Clean bower destination
 */
gulp.task("bower:clean", function() {
	return del([
		paths.webroot + "lib/**/*",
		"!" + paths.webroot + "lib/toastr/**",
		"!" + paths.webroot + "lib/kendo_ui/**"
	]);
});