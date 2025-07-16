// creating the routes

const express = require("express")
const { createUser, getUsers, updateUser, deleteUser, getUserById } = require("../controllers/userController")

const router = express.Router()

const { validate } = require("../middlewares/validateZod")
const { createUserSchema, UpdateUserSchema } = require("../validations/userValidation")


// router.get("/", getUsers)
// router.post("/", createUser)
// router.put("/:id", updateUser)
// router.delete("/:id", deleteUser)


router.post("/", validate(createUserSchema), createUser)
router.get("/", getUsers)
router.get("/:id", getUserById)
router.put("/:id", validate(UpdateUserSchema), updateUser)
router.delete("/:id", deleteUser)

module.exports = router