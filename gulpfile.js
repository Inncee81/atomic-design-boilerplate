// Version 1.2.0 - created by Summer of Dev

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
    mix.browserify('all.js', outputJsFile, 'resources/assets/js/', {});

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
            'vendor/bower_components/slice/'
        ]
    });



    /*
        Copy - Bower
     */
    mix.copy(
        'vendor/bower_components/jquery/dist/jquery.min.js',
        'public/js/vendor/jquery.js'
    )
    .copy(
        'vendor/bower_components/jquery/dist/jquery.min.map',
        'public/js/vendor/jquery.min.map'
    )
    .copy(
        'vendor/bower_components/normalize.css/normalize.css',
        'vendor/bower_components/normalize.css/normalize.scss'
    )
    .copy(
        'vendor/bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
        'public/js/polyfill/viewport-units-buggyfill.js'
    );



    /*
        Copy - Fonts
     */
    mix.copy(
        'resources/assets/font',
        'public/font'
    );



    /*
        Copy - Images
     */
    mix.copy(
        'resources/assets/img',
        'public/img'
    );


    /*
        Watch - Livereload
     */
    if(!elixir.config.production) {
        mix.livereload([reloadCss, reloadJs, reloadAppFiles]);
    }

});


/*
    Task - Modernizr customise
 */
gulp.task('modernizr', function() {
    return gulp.src('*.js')
        .pipe(modernizr({
            devFile: 'vendor/bower_components/modernizr/modernizr.js',
            options: [
                'setClasses'
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/vendor'));
});
