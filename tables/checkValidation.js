var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CheckValSchema = new Schema({
    uuid: String,
    StudentName: String,
    CheckInDateTime: String,
    CheckInTime: String,
    SigninBy: String,
    CheckOutDateTime: String,
    CheckOutTime: String,
    SignoutBy: String,
    CurrentLevel: String,
    NumberofRegularClasses: String,
    NumberofCatchUpClasses: String,
    Medical: String,
    StudentStrengthsWeeknesses: String,
    FeesPaid: String,
    State: String,
    Area: String,
    Center: String,
    Batch: String,
});

const CheckVal = mongoose.model('CheckVal', CheckValSchema)

module.exports = CheckVal;