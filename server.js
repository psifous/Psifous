let PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const next = require('next');
const path = require('path');
const compression = require('compression');

const routes = require('./routes');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = routes.getRequestHandler(nextApp);

nextApp
  .prepare()
  .then(() => {
    if (process.env.NODE_ENV === 'production') {
      app.use(compression());
      console.log('use compression');
    }
    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    console.log(path.join(__dirname, '.next/static'));
    app.use(
      '/next-static',
      express.static(path.join(__dirname, '.next/static'))
    );

    app.get('*', (req, res) => {
      return handler(req, res);
    });

    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`> ready on port ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
