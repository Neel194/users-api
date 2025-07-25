const express = require("express")
const router = express.Router()
const { register, logout } = require("../controllers/authController")
const { validate } = require("../middlewares/validateZod")
const { registerSchema } = require("../validations/authValidation")
const { loginSchema } = require("../validations/authValidation")
const { login } = require("../controllers/authController")
const authMiddleWare = require("../middlewares/authMiddleware")
const { getProfile } = require('../controllers/authController')

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/logout", logout)
router.get("/me", authMiddleWare, getProfile)

module.exports = router
