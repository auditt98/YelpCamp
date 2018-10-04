var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayName: String,
    profileImage: String,
    birthDay: Date
});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User",userSchema);
module.exports = User;