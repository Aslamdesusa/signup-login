var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CenterSchema = new Schema({
    centerName: String,
    AreaName: String,
    StateName: String,
    ContactPerson: String,
    Email: String,
    Mobile: Number,
    Date: {type: Date, default: Date.now}
});

const Center = mongoose.model('Center', CenterSchema)

module.exports = Center; 