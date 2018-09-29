var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BatchSchema = new Schema({
    Name: String,
    ID: {type:String, required:true, unique:true},
    StateName: String,
    AreaName: String,
    Center: String,
    StartDate: String,
    NumberOfClass: Number,
    actualClassLimit: Number,
    BatchDay: String,
    BatchSchedule: String,
    isActivate: Boolean,
    Teacher: String,
    Date: String,
    Time: String
});

const Batch = mongoose.model('Batch', BatchSchema)

module.exports = Batch;