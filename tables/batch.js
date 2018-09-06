var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BatchSchema = new Schema({
    Name: String,
    ID: {type:String, required:true, unique:true},
    Center: String,
    StartDate: String,
    NumberOfClass: String,
    BatchDay: String,
    BatchSchedule: String,
    Teacher: String,
    Date: {type: Date, default: Date.now}
});

const Batch = mongoose.model('Batch', BatchSchema)

module.exports = Batch;