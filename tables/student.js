var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    Name: String,
    ID: String,
    DateOfBirth: String,
    EnrollDate: String,
    CurrentLevel: String,
    Center: String,
    Batch: String,
    ContactName: String,
    Mobile: String,
    Email: String,
    ContactName1: String,
    Mobile1: String,
    Email1: String,
    ContactName2: String,
    Mobile2: String,
    Email2: String,
    CheckInOut: Boolean,
    PinCode: Array,
    Date: {type: Date, default: Date.now}
});

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student;