(function (imports) {

  'use strict';

  module.exports = {

    start: start
  };

  const defaults = {

    routes: {

      assets: '/static',

      data: '/data'
    }
  };

  function start(config) {

    const server = imports.express();

    server

        .use(defaults.routes.assets, imports.express.static(config.paths.assets))

        .get('/*', function (request, response) {
          response.sendFile(imports.path.resolve(config.paths.assets + 'index.html'));
        })

        .use(function (error, request, response, next) {
          if (error === 'NOT_AUTHORIZED') {
            response
                  .status(401)
                  .json({
                    message: "NOT_AUTHORIZED"
                  });
          } else {
            next(error);
          }
        })

        .listen (config.port);
  }
})({

  express: require('express'),
  path: require('path')
});
