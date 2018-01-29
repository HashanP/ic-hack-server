const express = require('express')
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const sequelize = new Sequelize("MusiqueDB", null, null, {
  dialect: "sqlite",

  define: {
    defaultScope : {
	attributes: {
	  exclude: ["id","createdAt", "updatedAt"]
	}
    } 
  },
  
  // SQLite only
  storage: './MusiqueDB'
});

const albums = sequelize.define('albums', {
	albumID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
	albumName: Sequelize.TEXT
})

const group = sequelize.define('group', {
	groupID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
	groupName: Sequelize.TEXT
})

const songs = sequelize.define('songs', {
	songID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
	name: Sequelize.TEXT,
	artist: Sequelize.TEXT,
	albumID: Sequelize.INTEGER, 
	popularity: Sequelize.INTEGER
})

const user = sequelize.define('user', {
	userName: {type: Sequelize.TEXT, primaryKey: true, unique: true},
	accessToken: Sequelize.INTEGER
})

const uPSongs = sequelize.define('userPlaylistSongs', {
	userPlaylistID: {type: Sequelize.TEXT, unique: 'compositeIndex'},
	songID: {type: Sequelize.INTEGER, unique: 'compositeIndex'}
})

const userPlaylists = sequelize.define('userPlaylists', {
	userName: {type: Sequelize.TEXT},
	userPlaylistID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
})

const userToGroup = sequelize.define('userToGroup', {
	userName: {type: Sequelize.TEXT, unique: 'compositeIndex'},
	groupID: {type: Sequelize.INTEGER, unique: 'compositeIndex'},
	admin: Sequelize.INTEGER
})

var app = express();

app.use(bodyParser.json());

var id = {}; 

var groups = {
  "bbb":["htr"],
  "ccc":["htr"]
};

uPSongs.hasMany(userPlaylists, {foreignKey: 'userPlaylistID'});
uPSongs.hasMany(songs, {foreignKey: 'songID'});
userPlaylists.belongsTo(uPSongs, {foreignKey: 'userPlaylistID'});
songs.belongsTo(uPSongs, {foreignKey: 'songID'});
userPlaylists.findAll({
	where: {
		userName: 'hMayo'
	}
}).then(function(t) {
	console.log(t);	
});
/*
songs.findAll({
	include:[{
		model: uPSongs,
		where: {userPlaylistID: 2}
	}],
	exclude: "id"
}).then(function(t) {
	console.log(t);
});
*/


app.post("/check", function(req, res){
  console.log(req.body);      
  var id2 = req.body.id;
  res.send({response:id2 in id});
});

app.post("/upload", function(req, res){
  console.log(req.body);
  var id2 = req.body.id;
  res.send({completed: true});
  id[id2] = req.body.playlists;
});


app.post("/join", function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var group = req.body.group;
  if (group in groups) {
    if (!groups[group].contains(username)) {
      groups[group].push(username);
    }
    res.send({response:true});
  } else {
    res.send({response:false});
  }
  console.log(groups);
  //superAdvancedSelectionAlgorithm(group);
});

var i = 0;
var getRandom = function() {
  return "b" + i;
  i++;
}

app.post("/list", function(req, res) {
  var all = [];
  for (var g in groups) {
    if (groups[g].contains(req.body.username)) {
      all.push(g);
    }
  }
  res.send({response: true, all: all});
});

app.post("/create", function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var str = getRandom();
  groups[str] = [username]
  res.send({response:true, name: str});
  console.log(req.body);
//  superAdvancedSelectionAlgorithm(str);
});


app.listen(3000);

console.log("Server running...");

