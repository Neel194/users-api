const { z } = require("zod")
const { updateUser } = require("../controllers/userController")

const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email!"),
})

const UpdateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email("Invalid email").optional(),
})

module.exports = { createUserSchema, UpdateUserSchema }