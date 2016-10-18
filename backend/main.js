(function (imports) {

  'use strict';

  const args = imports.commandLineArgs([
    {
      name: 'assets',
      type: String
    },
    {
      name: 'port',
      type: Number
    }
  ]);

  imports.application.start({

    paths: {

      assets: args.assets
    },

    port: args.port
  });
})({

  commandLineArgs: require('command-line-args'),

  application: require('./application')
});
