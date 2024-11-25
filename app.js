// # CONFIG ENVIRONMENT VARIABLES
require('dotenv').config();

// # CONFIG EXPRESS

// * INIT EXPRESS
const express = require('express');
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;

// * JSON PARSER FOR BODY REQUESTS
app.use(express.json());

// * SERVING PUBLIC FOLDER
app.use(express.static('public'));

// * IMPORT ROUTERS
const pizzasRouter = require('./routers/pizzas.js');

// * SETTING ROUTERS
app.use('/pizzas', pizzasRouter);

// * START LISTENING
app.listen(port, () => {
  console.log(`App listening at ${domain}:${port}`);
});
