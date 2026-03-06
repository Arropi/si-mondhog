import dotenv from 'dotenv'
dotenv.config({
  path: '.env.development',
})

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth-route.js'
import userRoutes from './routes/user-route.js'
import { connectDB } from './config/database.js'
import { specs, swaggerUi } from './config/swagger.js'
import { errorMiddleware } from './middleware/error-middleware.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/api/auth', authRoutes)

app.use("/api", userRoutes)

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await connectDB(process.env.DB_URI)
})