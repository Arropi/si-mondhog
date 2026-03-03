import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth-route.js'
import { connectDB } from './config/database.js'

dotenv.config({
  path: '.env.development',
})

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await connectDB(process.env.DB_URI)
})