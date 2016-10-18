(function (imports) {

  'use strict';

  const args = imports.commandLineArgs([
    {
      name: 'port',
      type: Number
    }
  ]);

  const defaults = {

    port: 8090,

    paths: {

      assets: './frontend/src/',

      backend: './backend/main.js'
    }
  };

  imports.gulp.task('deploy', function (callback) {

    var started = false;

    return imports.nodemon({
             script: defaults.paths.backend,
             args: [
               '--assets=' + defaults.paths.assets,
               '--port=' + (isNaN(args.port) ? defaults.port : args.port)
             ]
           })
           .on('start', function () {
             if (!started) {
               callback();
               started = true; 
             } 
           });
   });
})({

  commandLineArgs: require('command-line-args'),
  gulp: require('gulp'),
  nodemon: require('gulp-nodemon')
});
