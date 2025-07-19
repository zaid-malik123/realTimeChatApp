const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
name: {
    type: String,
},
userName: {
    type: String,
    required: true,
    unique: true,
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    required: true,
},
image: {
    type: String,                               
    default: ""
}
},{timeStamps:true})

module.exports = mongoose.model("User", userSchema)