const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rp = require('request-promise');

require('dotenv').config()

const app = express();

const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(port);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Logged list of items');
});

app.post('/api/postName', (req, res) => {
  console.log("POST: postName");
  var name = req.body.name;
  const key = process.env.REACT_APP_GSE;

  var options = {
    uri: 'https://www.googleapis.com/customsearch/v1',
    qs: {
      cx: process.env.REACT_APP_GSE_ID,
      q: name,
      key: process.env.REACT_APP_GSE
    }
  }
  rp(options)
  .then(data => {
    console.log("Received data from google search engine");
    res.send(data)
  })
  .catch(err => {
    console.log("Error from SE: ", err);
    res.status(501).send(err)
  })

  // res.send({name: name});
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



console.log('App is listening on port ' + port);