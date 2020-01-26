const jwt = require("jsonwebtoken")
module.exports.generateToken = async (data) => {
    return jwt.sign({ user: data }, 'hello')
}