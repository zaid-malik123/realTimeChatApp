const User = require("../models/user.model");
const bcrypt = require("bcrypt")
const {genToken} = require("../config/Token")

module.exports.signupController = async (req, res, next)=>{
try {
    const {userName, email, password} = req.body;
    const checkByUserName = await User.findOne({userName});
    if(checkByUserName){
        return res.status(400).json({message: "username already exist"})
    }
    const checkByEmail = await User.findOne({userName});
    if(checkByEmail){
        return res.status(400).json({message: "email already exist"})
    }
    if(password.length > 6){
        return res.status(400).json({message: "password at least 6 characters"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })
    const token = await genToken(user._id)
    res.cookie("token", token)
    return res.status(201).json({message: "userCreated Successfully 👍",user})
} catch (error) {
    return res.status(500).json({message: `signup error ${error}` })
}
}

module.exports.loginController = async (req, res, next)=>{
try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: "user does not exist"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "incorrect password"})
    }
    const token = await genToken(user._id)
    res.cookie("token", token)
    return res.status(201).json({message: "login Successfully 👍", user})
} catch (error) {
    return res.status(500).json({message: `login error ${error}` })
}
}

module.exports.logoutController = async (req, res, next)=>{
try {
    res.clearCookie("token");
    return res.status(200).json({message: "logout successfully"})
} catch (error) {
    return res.status(500).json({message: `logout error ${error}` })
}
}