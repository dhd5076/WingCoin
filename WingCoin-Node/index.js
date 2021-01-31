const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routes')
const parser = require('body-parser');

const app = express()
const port = 3000


app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(parser.urlencoded({ extended: true }));
app.use(session({
  secret: 'cookiesecret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  store: new MongoStore({  
    host: '127.0.0.1', 
    port: '27017', 
    collections: 'sessions', 
    url: 'mongodb://localhost:27017/WingCoin'    
  })
}));
app.use('/', indexRouter);
app.use('*', (req, res) => {
  res.send("NOT FOUND")
});

console.log("Connecting To Database...")
mongoose.connect('mongodb://localhost/WingCoin', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connected To Database")
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
.catch((error) => {
  console.log("Failed To Connect To Database: " +  error)
})

console.log("asdasdsd")