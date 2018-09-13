var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StateSchema = new Schema({
    stateName: String,
    Abbr: String,
    contactPerson: String,
    Email: String,
    Mobile: Number,
    Date: {type: Date, default: Date.now}
});

const State = mongoose.model('State', StateSchema)

module.exports = State;