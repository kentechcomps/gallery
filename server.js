const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

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

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Routesa
app.use('/', index);
app.use('/image', image);

app.post('/github-webhook/', (req, res) => {
  console.log('✅ GitHub webhook received:', req.body);

  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/job/Code Challenge/build', // Replace with your real Jenkins job name
    method: 'POST',
    auth: 'kenchez:11b4b11f3f27f0dfa89e28836c431e5a3a', // Replace with real credentials
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const jenkinsReq = http.request(options, (jenkinsRes) => {
    console.log(`🚀 Jenkins responded with status: ${jenkinsRes.statusCode}`);
    res.sendStatus(200);
  });

  jenkinsReq.on('error', (err) => {
    console.error('❌ Error triggering Jenkins:', err.message);
    res.sendStatus(500);
  });

  jenkinsReq.end(); // Don’t forget to send the request
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
