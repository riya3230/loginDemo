// const { User, validate } = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../helper/user")
const queries = require("../queries/user");
const {validationResult} = require('express-validator')

//create User
module.exports.createUser = async (req, res) => {
    //check data for any errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(404).send({done: false, errors: errors.array()})
    }

    //check any user exists or not
    let userExixt = await queries.findOne({email:req.body.email})
    // if user found then return error
    if (userExixt.length) {
      res
        .status(404)
        .send({done: false,errors:[{ isCreated: false, msg: "email already exists" }]})
      return
    }

    //create user
    const user = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      gender: req.body.gender || "",
      role:req.body.role
    }

    //encrypt password with bcrypt
    user.password = await bcrypt.hash(user.password, 10)
    //save user in mongodb
    await queries.insertData(user).then(async (todo) => {
      const token =await generateToken(user)
    
      return res.status(200).send({done:true,token});
    }).catch((error) => console.log('err',error));
}

//validate email and password for login
module.exports.validateLogin = async (req, res) => {
    const { email } = req.body
    const password=await bcrypt.hash(req.body.password, 10)
    //get user with email
    const user = await queries.findOne({email})
    //if use not found return
    if (!user.length) {
      res.status(404).send({ done: false, msg: "user not found" })
      return
    }
    await bcrypt.compare(req.body.password,user[0].password).then(function(data) {
      if (!data) {
        res.status(404).send({ done: false, errors:[{ isCreated: false, msg: "password does not match" }]})
      }
    })
    const token =await generateToken(user)
      res.status(200).send({ done: true, token })
}

//get self user data
module.exports.getSelf = async (req, res) => {
  try {
    const { _id, name, email, gender,role } = req.user.data
    const user = { _id, name, email, gender,role }
    //send response with user
    if(role !== 'O') 
      res.status(200).send({ done: true,user: [user] })
    else{
      const userData = await queries.findAll({email:req.body.email})
      res.status(200).send({ done: true, user:userData })
    }
  } catch (Exception) {
    res.send({ done: false, message: Exception.message })
  }
}
