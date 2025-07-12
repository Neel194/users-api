const express = require("express")
const router = express.Router()
const { register } = require("../controllers/authController")
const { validate } = require("../middlewares/validateZod")
const { registerSchema } = require("../validations/authValidation")
const { loginSchema } = require("../validations/authValidation")
const { login } = require("../controllers/authController")


router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)

module.exports = router