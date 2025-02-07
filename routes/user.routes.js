const express = require("express")
const { UserModel } = require("../models/user.model")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const e = require("express")

const userRouter = express.Router()

userRouter.post("/", async (req, res) => {
    const { name, password, email } = req.body
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: "Email already exists" });
    }
    try {
        bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async (err, hash) => {
            if (err) {
                res.status(400).send({ msg: err, ststus: res.statusCode })
            } else {
                const newUser = new UserModel({ name, email, password: hash })
                await newUser.save()
                res.status(200).send({ msg: "SignUp Successfull", status: res.statusCode })
            }
        });

    } catch (error) {

        res.status(500).send({ message: "An unexpected error occurred", error: error.message, status: res.statusCode });

    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const matchingUser = await UserModel.findOne({ email })
        if (matchingUser) {
            const isPasswordMatching = await bcrypt.compare(password, matchingUser.password)
            if (isPasswordMatching) {
                const token = jwt.sign({ userId: matchingUser._id , user:matchingUser.name}, process.env.SECRET_KEY)
                res.status(200).send({ msg: "Login Successfull", token, status: res.statusCode })
            }
            else {
                res.status(400).send({ msg: "Login Failed Wrong Credential", ststus: res.statusCode })
            }
        } else {
            res.status(404).send({ msg: "User Not Found", ststus: res.statusCode })
        }
    } catch (error) {
        res.status(500).send({ msg: "An unexpected error occurred", error: error.message, status: res.statusCode });
    }
})

userRouter.get("/users", async(req,res)=>{
    try{
    const users = await UserModel.find().populate("notes")
    res.status(200).send({msg:users})
} catch(err){
    console.log(err);
    
}

})

module.exports = { userRouter }