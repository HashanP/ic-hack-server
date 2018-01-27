const express = require("express")
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.json({ type: "application/*+json" }))

var id = {};

app.get("/check", function(req, res) {
  var id2 = req.body.id;
  var t = id2 in id;
  if (!t) {
    id[id2] = true;
  }
  res.send({"response":t});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
