const express = require("express")
const userRoutes = require("./routes/userRoutes")

const app = express()
const PORT = 5000

app.use(express.json()) // body parser
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})