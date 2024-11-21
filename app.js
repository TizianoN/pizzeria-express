// # CONFIG ENVIRONMENT VARIABLES
require('dotenv').config();

// # CONFIG EXPRESS
const express = require('express');
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;

// # IMPORT ROUTERS
const pizzasRouter = require('./routers/pizzas.js');

// # SETTING ROUTERS
app.use('/pizzas', pizzasRouter);

// # START LISTENING
app.listen(port, () => {
  console.log(`App listening at ${domain}:${port}`);
});
