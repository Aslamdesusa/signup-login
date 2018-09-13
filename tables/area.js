var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AreaSchema = new Schema({
    AreaName: String,
    stateName: String,
    contactPerson: String,
    Email: String,
    Mobile: Number,
    Date: {type: Date, default: Date.now}
});

const Area = mongoose.model('Area', AreaSchema)

module.exports = Area;