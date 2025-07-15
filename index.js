const express = require("express")
const userRoutes = require("./routes/userRoutes")
const { config } = require("dotenv")
const connectDB = require("./config/db")
const dotenv = require('dotenv')
const errorHandler = require("./middlewares/errorHandler")
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const uploadRoutes = require("./routes/uploadRoutes")

dotenv.config()
connectDB()

const app = express()
app.use(express.json()) // body parser

app.use("/api", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/uploads", express.static("uploads")) // serve static file means if anything there in uploads folder(in project locally) then give response of it

app.use(errorHandler)  // GLOBAL error middleware

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})