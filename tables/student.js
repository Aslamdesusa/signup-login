var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    Name: String,
    ID: String,
    DateOfBirth: String,
    EnrollDate: String,
    CurrentLevel: String,
    State: String,
    Area: String,
    Center: String,
    Batch: String,
    CheckInOut: Boolean,
    Details: Array,
    Date: String,
    Time: String
});

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student;