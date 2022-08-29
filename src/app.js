const env  = require('./env');

const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./api/routes/index');
const cors = require('cors');

const port = process.env.PORT || 4000;


// Initialize our app
const app = express();
app.use(cors())
 
app.get('/provider', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
// var corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200
// }
// app.options('*', cors(corsOptions));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false
  })
);


app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`PMS service listening at http://localhost:${port}`);
});


module.exports = app;