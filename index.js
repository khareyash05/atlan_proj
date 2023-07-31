const express = require('express');
const app = express();
const dotenv = require('dotenv');

const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

require('dotenv').config()

require("./config/db")

app.use(routes);

app.listen(process.env.PORT || 5000);