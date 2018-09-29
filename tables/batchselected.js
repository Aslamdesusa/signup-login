var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BatchselectedSchema = new Schema({
    BatchID: String,
    BatchName: String,
    Center: String,
    BatchDay: String,
    ClassAddbyTeacherName: String,
    CurrentNumberOfClass: String,
    State: String,
    Area: String,
    Center: String,
    Date: String,
});

const Batchselected = mongoose.model('Batchselected', BatchselectedSchema)

module.exports = Batchselected;