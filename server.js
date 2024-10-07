import express from "express"
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'
import cookieParser from 'cookie-parser'
const app = express()
const port = process.env.PORT || 8000
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/user',userRouter)
app.listen(port, ()=>{
    console.log(`The server is listening on por ${port}`)

})