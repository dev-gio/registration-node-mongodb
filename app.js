require('dotenv').config();
require('./models/Registration');

const express = require('express');
const routes = require('./routes/index');
const path = require("path");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views")); //setting views directory for views.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars"); //setting view engine as handlebars

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});