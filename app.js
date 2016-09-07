var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerTools = require('swagger-tools');
var stt = require('swagger-test-templates');

var routes = require('./routes/index');

var app = express();

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to desribe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// gen test files
stt.testGen(swaggerSpec, {
  assertionFormat: 'should',
  testModule: 'supertest',
  pathName: []
}).map(testFile => {
  fs.writeFileSync('./test/' + testFile.name, testFile.test);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// solve cors 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://petstore.swagger.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization');
  next();
});

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerSpec, (middleware) => {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator({
    validateResponse: false
  }));

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter({
    // controllers: './controllers',  // To enable Mock, you shuold also comment this
    useStubs: /*process.env.NODE_ENV === 'development' ?*/ true /*: false*/ // Conditionally turn on stubs (mock mode)
  }));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.listen(3000);
});
