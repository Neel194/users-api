const { z } = require("zod")
const { updateUser } = require("../controllers/userController")

const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email!"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const UpdateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email("Invalid email").optional(),
})

module.exports = { createUserSchema, UpdateUserSchema }
