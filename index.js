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
  res.send(id2 in id);
});

app.listen(3000);

console.log("Server running...");

