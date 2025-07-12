const express = require("express")
const router = express.Router()
const { register } = require("../controllers/authController")
const { validate } = require("../middlewares/validateZod")
const { registerSchema } = require("../validations/authValidation")

router.post("/register", validate(registerSchema), register)

module.exports = router