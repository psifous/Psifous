const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const next = require('next');
const path = require('path');

const PORT = process.env.port || 3000;
const routes = require('./routes');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());
    server.use(logger('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    console.log(path.join(__dirname, '.next/static'));
    server.use(
      '/next-static',
      express.static(path.join(__dirname, '.next/static'))
    );

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> ready on port ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
