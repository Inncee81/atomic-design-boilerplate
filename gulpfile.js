// Version 1.6.0
// Author: Te Riu Warren
// Pixel Fusion



/*
    Import modules
 */
require('elixir-jshint');
require('laravel-elixir-livereload');



/*
    Declare variables
 */
var bourbon = require('node-bourbon'),
    elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    task = elixir.Task,
    uglify = require('gulp-uglify'),
    outputCssDir = 'public/css',
    outputJsDir = 'public/js',
    outputJsFile = outputJsDir + '/app.js',
    dependencyDir = 'node_modules',
    dependencies = {
        normalize:     dependencyDir + '/normalize.css/',
        slicer:        dependencyDir + '/sass-slicer/'
    };



/*
    Extension - JS Compress
 */
elixir.extend('compressScripts', function(source, dest) {
    new task('compressScripts', function() {
        return gulp.src(source)
            .pipe(uglify({
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }))
            .pipe(gulp.dest(dest));
    });
});



/*
    Elixir Called
 */
elixir(function(mix) {


    /*
        Lint - Javascript
     */
    mix.jshint(['resources/assets/js/**/*.js', 'resources/assets/js/*.js']);



    /*
        Assets - Javascript
     */
    mix.browserify('resources/assets/js/app.js');

    if(elixir.config.production) {
        mix.compressScripts(outputJsFile, outputJsDir);
    }



    /*
        Copy
     */
    mix.copy(
        dependencies.normalize + 'normalize.css', // Need this so @import includes into our generated file
        dependencies.normalize + 'normalize.scss'
    );



    /*
        Assets - SASS
     */
    mix.sass('app.scss', outputCssDir, {
        includePaths: [
            bourbon.includePaths,
            dependencies.normalize,
            dependencies.slicer
        ]
    });



    /*
        Version
     */
    mix.version([
        'public/css/app.css',
        'public/js/app.js'
    ]);



    /*
        Live Reload
     */
    mix.livereload();

});
