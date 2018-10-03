var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AbsentStudentSchema = new Schema({
    uuid: String,
    StudentName: String,
    State: String,
    Area: String,
    Center: String,
    Batch: String,
    BatchDay: String,
    AbsentDate: String
});

const AbsentStudent = mongoose.model('AbsentStudent', AbsentStudentSchema)

module.exports = AbsentStudent;