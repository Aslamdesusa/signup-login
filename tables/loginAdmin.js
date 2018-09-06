var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    Admin: Boolean,
    Center: String,
    isLogin: Boolean,
    Date: {type: Date, default: Date.now}
});

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin;