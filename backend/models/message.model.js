const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
message: {
    type: String,
    default: ""
},
image: {
     type: String,
     default: ""
}
},{timeStamps:true})

module.exports = mongoose.model("Message", messageSchema)