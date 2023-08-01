const express = require('express');
const app = express();
const dotenv = require('dotenv');

const routes = require('./routes');
const keys = require('./config/keys');
const { port } = keys;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

require('dotenv').config()

require("./config/db")

app.use(routes);

app.listen(port, () => {
    console.log(
        `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}
)