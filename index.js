const express = require('express');
const app = express();
const dotenv = require('dotenv');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');

const routes = require('./routes');
const i18nextConfig = require('./locales');
const keys = require('./config/keys');
const { port } = keys;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
i18next.init(i18nextConfig);
app.use(i18nextMiddleware.handle(i18next));

require('dotenv').config()

require("./config/db")

app.use(routes);

app.listen(port, () => {
    console.log(
        `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}
)