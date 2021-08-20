// importing modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
  
  
var UserSchema = new Schema({   
    email: String,
    password : String
});
  
// plugin for passport-local-mongoose
  
// export userschema
 module.exports = mongoose.model("User", UserSchema);