const express = require('express')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const sequelize = new Sequelize("MusiqueDB", null, null, {
  dialect: "sqlite",
  
  // SQLite only
  storage: './database.sqlite'
});

var app = express();

app.use(bodyParser.json());

var id = {};

app.post("/check", function(req, res){
  console.log(req.body);      
  var id2 = req.body.id;
  res.send(id2 in id);
});

app.listen(3000);
