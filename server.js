import express from "express"
import 'dotenv/config.js'
import './config/dbConnection.js'

//Server instance
const app = express()
const PORT = process.env.PORT || 3000

//MIDDLEWARE
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})