// Version 1.3.0 - created by Summer of Dev

/*
    Import modules
 */
require('laravel-elixir-jshint');
require('laravel-elixir-livereload');



/*
    Declare variables
 */
var bourbon = require('node-bourbon'),
    elixir = require('laravel-elixir'),
    browserify = require('laravel-elixir-browserify'),
    gulp = require('gulp'),
    modernizr = require('gulp-modernizr'),
    uglify = require('gulp-uglify'),
    outputCssDir = 'public/css',
    outputJsDir = 'public/js',
    outputJsFile = outputJsDir + '/all.js',
    reloadCss = outputCssDir + '/*.css',
    reloadJs = outputJsDir + '/*.js',
    reloadAppFiles = 'public/*.php';



/*
    Extension - JS Compress
 */
elixir.extend('compressScripts', function(source, dest) {

    gulp.task('compressScripts', function() {
        return gulp.src(source)
            .pipe(uglify({compress: {drop_console: true, drop_debugger: true}}))
            .pipe(gulp.dest(dest));
    });

    return this.queueTask('compressScripts');
});



/*
    Elixir Called
 */
elixir(function(mix) {


    /*
        Lint - Javascript
     */
    mix.jshint(['resources/assets/js/module/*.js', 'resources/assets/js/*.js']);
    // CSS lint to go here, based on RECESS



    /*
        Assets - Javascript
     */
    browserify.init();
    mix.browserify('resources/assets/js/all.js', {
        debug: true,
        transform: ['babelify'],
        // transform: ['vueify'],
        output: 'public/js'
    });

    mix.scriptsIn('resources/assets/js/polyfill/', 'public/js/polyfill.js');
    mix.scriptsIn('resources/assets/js/vendor/', 'public/js/vendor.js');

    if(elixir.config.production) {
        mix.compressScripts(outputJsFile, outputJsDir);
    }



    /*
        Assets - SASS
     */
    mix.sass('resources/assets/sass/*.scss', outputCssDir, {
        includePaths: [
            bourbon.includePaths,
            'vendor/bower_components/normalize.css/',
            'vendor/bower_components/slicer/'
        ]
    });



    /*
        Copy - Bower
     */
    mix.copy(
        'vendor/bower_components/normalize.css/normalize.css',
        'vendor/bower_components/normalize.css/normalize.scss'
    )
    .copy(
        'vendor/bower_components/svg4everybody/svg4everybody.min.js',
        'resources/assets/js/polyfill/svg4everybody.js'
    )
    .copy(
        'vendor/bower_components/picturefill/dist/picturefill.min.js',
        'resources/assets/js/polyfill/picturefill.js'
    )
    .copy(
        'vendor/bower_components/min/dist/$.min.js',
        'resources/assets/js/vendor/$.js'
    )
    .copy(
        'vendor/bower_components/vue/dist/vue.min.js',
        'resources/assets/js/vendor/vue.js'
    );


    /*
        Watch - Livereload
     */
    if(!elixir.config.production) {
        mix.livereload([reloadCss, reloadJs, reloadAppFiles]);
    }

});
