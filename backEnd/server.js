require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const uri = 'mongodb://localhost:27017/demo'
const user = require("./routes/user")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const passport = require('passport');
require('./auth/passport')(passport);

app.use(cors())

if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"))
app.use(express.json())

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.log(err))

app.use(passport.initialize());  
app.use('/user', user);

module.exports = app
