const express = require('express')
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var id = {};

app.post("/check", function(req, res){
  console.log(req.body);      
  var id2 = req.body.id;
  res.send(id2 in id);
});

app.listen(3000);
