// Including the Mongoose ORM to connect with Mongo DB
const Mongoose = require('mongoose');


// const databaseURI = 'mongodb://kumar:mera55555#@ds141641.mlab.com:41641/merakaamkaaj';
const mongoDbUri = 'mongodb://checkin:check123@ds029224.mlab.com:29224/check-in-out';

mongodb://<dbuser>:<dbpassword>@ds141641.mlab.com:41641/merakaamkaaj
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

