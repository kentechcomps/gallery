const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

<<<<<<< HEAD
// Connect to the database
const config = require('./_config');
const mongoURI = config.mongoURI.production;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
});

let db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected successfully');
});

// Initialize the app
const app = express();
=======
// Initializing the app
const app = express();

// connecting the database

const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env]
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if (err) {
        console.log(err)
    }else{
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })


>>>>>>> test

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Routesa
app.use('/', index);
app.use('/image', image);

// ✅ GitHub Webhook Route
app.post('/github-webhook/', (req, res) => {
  console.log('✅ GitHub webhook received:', req.body);
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

<<<<<<< HEAD
=======
 
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;
>>>>>>> test
