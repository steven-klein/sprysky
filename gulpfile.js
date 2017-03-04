var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    minify = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    handlbarsConfig = require('./handlebars.config.js');

gulp.task('handlebars', ['templates']);
gulp.task('templates', function () {

    var src = handlbarsConfig.src;

    var data = function(){
        delete require.cache[require.resolve('./resources/data')]
        return require('./resources/data');
    }();

    //skip some templates on production builds
    if(!!util.env.production){
        handlbarsConfig.ignoreProduction.forEach(function(element){
            src.push('!' + element);
        });
    }

    return gulp.src(src)
        .pipe(plumber())
        .pipe(handlebars(
            data,
            handlbarsConfig
        ))
        .pipe(rename(function (path) {
            path.extname = (path.extname === '' ) ? '' : handlbarsConfig.fileExtension
        }))
        .pipe(
            !!util.env.production ?                        minify(handlbarsConfig.minifyOptions) : util.noop()
        )
        .pipe(plumber.stop())
        .pipe(gulp.dest(handlbarsConfig.dest));
});

/**
 * Watch
 */
gulp.task('watch', function() {
    //watch for file changes if they are set
    gulp.watch( handlbarsConfig.watch, ['templates'] );

    //watch for changes on our data file
    gulp.watch( handlbarsConfig.data, ['templates'] );
});

/**
 * Default Task
 */
gulp.task('default', ['templates']);
