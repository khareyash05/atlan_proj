const express = require('express');
const app = express();
const dotenv = require('dotenv');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');

const routes = require('./routes');
const i18nextConfig = require('./locales');
const keys = require('./config/keys');
const { port } = keys;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// i18next initialization
i18next.init(i18nextConfig);
app.use(i18nextMiddleware.handle(i18next));

// Load environment variables
dotenv.config();

// Database and controllers
require('./config/db');
require('./controllers/graphController');

// Routes
app.use(routes);

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    );
  });
}

module.exports = app;
