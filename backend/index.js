import express from 'express'
import { configDotenv } from 'dotenv'
import { connectDB } from './db/connectDB.js'
import BookRouter from './routes/bookRoute.js'
import userRouter from './routes/userRoute.js'
import reviewRouter from './routes/reviewRoute.js'

configDotenv()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.use('/api/v1/books', BookRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/review', reviewRouter)
app.get('/', (req, res) => res.send('Hello world'))
app.listen(PORT, () => {
  connectDB(), console.log('Server is connected to PORT:', PORT)
})
