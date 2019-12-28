require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')



const session       = require('express-session');
const passport      = require('passport');

require('./configs/passport');

mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(express.static(path.join(__dirname, '../client/build')))

// ADD SESSION SETTINGS HERE:
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));

// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express API For React App - Generated with IronGenerator';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
}));


// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);
app.use('/api/auth', require('./routes/auth-routes'))




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = app;
