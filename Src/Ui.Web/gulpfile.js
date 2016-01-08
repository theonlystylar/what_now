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
	gulp.src("bower_components/bootswatch/yeti/bootstrap*.css")
		.pipe(gulp.dest(paths.webroot + "lib/bootswatch/yeti"));

	// font-awesome
	gulp.src("bower_components/font-awesome/css/font-awesome*.css")
		.pipe(gulp.dest(paths.webroot + "lib/font-awesome"));

	// jquery
	gulp.src("bower_components/jquery/dist/jquery*.js")
		.pipe(gulp.dest(paths.webroot + "lib/jquery"));

	// angular
	gulp.src("bower_components/angular/angular*.js")
		.pipe(gulp.dest(paths.webroot + "lib/angular"));
});

/*
 * Clean bower destination
 */
gulp.task("bower:clean", function() {
	return del(paths.webroot + "lib/**/*");
});