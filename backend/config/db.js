const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect(process.env.DB_URi).then(()=>{
        console.log("connected Successfully 👍")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDb;