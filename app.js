// # CONFIG ENVIRONMENT VARIABLES
require('dotenv').config();

// ### CONFIG EXPRESS

// * INIT EXPRESS
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
const frontendUrl = process.env.FRONTEND_URL;

// * REGISTERING MIDDLEWARES
const checkTime = require('./middlewares/checkTime.js');
const errorsHandler = require('./middlewares/errorsHandler.js');
const notFound = require('./middlewares/notFound.js');

app.use(express.json());
app.use(express.static('public'));
app.use(checkTime);
app.use(
  cors({
    origin: frontendUrl,
  })
);

// * REGISTERING ROUTES
const pizzasRouter = require('./routers/pizzas.js');
app.use('/pizzas', pizzasRouter);

// * ERROR HANDLERS
app.use(errorsHandler);
app.use(notFound);

// * START LISTENING
app.listen(port, () => {
  console.log(`App listening at ${domain}:${port}`);
});
