const env  = require('./env');

const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./api/routes/index');
const eurekaHelper = require('../src/api/helper/eureka_helper');

const port = process.env.PORT || 4000;


// Initialize our app
const app = express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);
eurekaHelper.registerWithEureka('provider', port);


app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`PMS service listening at http://localhost:${port}`);
});


module.exports = app;