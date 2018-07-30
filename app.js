 var express = require('express');
 var path = require('path');
 var logger = require('morgan');
 var mongoose = require('mongoose');
 var bodyParser = require('body-parser');
 var session = require('express-session');



 // exported 
 var config = require('./config/database');
 var pages = require('./routes/pages');
 var adminPages = require('./routes/admin_pages');

  
 //connect to db
 mongoose.connect(config.database, { useNewUrlParser: true });
 var db = mongoose.connection;

 //Init app
 var app = express();

 //view setup engine
 app.set('views', path.join(__dirname,'views'));
 app.set('view engine', 'ejs');

 //set public folder
 app.use(express.static(path.join(__dirname, 'public')));


 // body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//logger
app.use(logger('dev'));

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

  //express Messages middleware
  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
 });

 //set routes
 app.use('/admin/pages',adminPages);
 app.use('/',pages);

 


 //start the server

 var port = 3000;
 app.listen(port,function(){
     console.log('server started on port' + port);
 });