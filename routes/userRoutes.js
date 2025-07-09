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


router.post("/users", validate(createUserSchema), createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", validate(UpdateUserSchema), updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;