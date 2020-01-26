const Express = require("express")
const route = Express.Router()
const { check } = require('express-validator');
const passport = require("passport")

const {
  createUser,
  getSelf,
  validateLogin,
} = require("../controller/user")
route.post("/create", [
  check('name').isLength({ min: 3 }),
  check('email').isEmail(),
  check('role').exists(),
  check('password')
  .exists()
  .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')
  .isLength({ min: 8 })
  .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')  
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
  .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')  
],createUser)

route.post("/login", validateLogin)

route.get(
  "/self",
  passport.authenticate("jwt", { session: false }),
  getSelf
)

module.exports = route
