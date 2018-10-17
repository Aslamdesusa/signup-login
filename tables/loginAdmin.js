var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
	firstName: {type:String, required:true},  
	lastName: {type:String, required:true},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    moderator: {type: String, enum: ['SuperAdmin', 'StateAdmin', 'CenterAdmin', 'Teacher']},
    HeadPlace: String,
    isLogin: Boolean,
    Date: {type: Date, default: Date.now}
});

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin;