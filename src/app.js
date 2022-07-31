const env  = require('./env');

const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./api/routes/index');
const eurekaHelper = require('../src/api/helper/eureka_helper');

const port = process.env.PORT || 4000;

const { Tracer, ExplicitContext, BatchRecorder, jsonEncoder } = require("zipkin");
const { HttpLogger } = require("zipkin-transport-http");
const zipkinMiddleware = require("zipkin-instrumentation-express").expressMiddleware;

const ZIPKIN_ENDPOINT = process.env.ZIPKIN_ENDPOINT || "http://localhost:9411";

// Get ourselves a zipkin tracer
const tracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${ZIPKIN_ENDPOINT}/api/v2/spans`,
      jsonEncoder: jsonEncoder.JSON_V2,
    }),
  }),
  localServiceName: "provider",
});

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
app.use(zipkinMiddleware({ tracer }));
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`PMS service listening at http://localhost:${port}`);
});

eurekaHelper.registerWithEureka('provider', port);

module.exports = app;