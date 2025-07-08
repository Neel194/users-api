const express = require("express")
const userRoutes = require("./routes/userRoutes")
const { config } = require("dotenv")
const connectDB = require("./config/db")
const dotenv = require('dotenv')

dotenv.config()
connectDB()

const app = express()
app.use(express.json()) // body parser

app.use("/api/users", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})