import express from "express"
import cors from "cors"
import 'dotenv/config.js'
import './config/dbConnection.js'
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
import commentRouter from './routes/commentRouter.js'

//Server instance
const app = express()
const PORT = process.env.PORT || 3000

//MIDDLEWARE
app.use(express.json())
app.use(cors())

//ROUTERS
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})