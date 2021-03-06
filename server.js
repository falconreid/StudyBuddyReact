const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
// const colors = require('colors');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const logger = require('morgan');
const routes = require('./routes');




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(flash());
app.use(express.static('public'));

app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
  }),
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);



// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/studybuddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
<<<<<<< HEAD
  useFindAndModify: false
=======
  useFindAndModify: false,
>>>>>>> ed8e23a3838c1bb7ebaded3905b66647bf5513cc
});


mongoose.set('useFindAndModify', false);


// Start the API server
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`🌎  connected on port ${PORT} 🌍`);
});
