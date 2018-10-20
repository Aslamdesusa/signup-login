// Including the Mongoose ORM to connect with Mongo DB
const Mongoose = require('mongoose');

// Conection with Database with Username and password. Password must without Special carecter
const mongoDbUri = 'mongodb://checkin:check123@ds029224.mlab.com:29224/check-in-out';

// Development level
// mongodb://ucmas-dev:ucmas123@ds137483.mlab.com:37483/ucmas-dev

// Production level 
// mongodb://checkin:check123@ds029224.mlab.com:29224/check-in-out

// Making connection with 'MongoDB'
Mongoose.connect(mongoDbUri, { useMongoClient:true })

//Variable to store the database connection
var db = Mongoose.connection;

//Handling errors!
db.on('error', console.error.bind(console, 'connection error'));


db.once('open', function callback(){
    console.log('Connection with database succeeded ' + mongoDbUri);
});

exports.db=db;

