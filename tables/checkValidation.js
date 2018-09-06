var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CheckValSchema = new Schema({
    uuid: String,
    CheckInDateTime: String,
    CheckOutDateTime: String,
});

const CheckVal = mongoose.model('CheckVal', CheckValSchema)

module.exports = CheckVal;