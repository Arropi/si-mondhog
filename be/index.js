import dotenv from 'dotenv'
dotenv.config({
  path: '.env.development.local',
})

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth-route.js'
import userRoutes from './routes/user-route.js'
import machineRoutes from './routes/machine-route.js'
import agentRoutes from './routes/agent-route.js'
import dashboardRoutes from './routes/dashboard-route.js'
import csvRoutes from './routes/csv-route.js'
import { connectDB } from './config/database.js'
import { specs, swaggerUi } from './config/swagger.js'
import { errorMiddleware } from './middleware/error-middleware.js'
import authMiddleware from './middleware/auth-middleware.js'
import { arcjetMiddleware } from './middleware/arcjet-middleware.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/api/agent', agentRoutes)

// app.use(arcjetMiddleware)

app.use('/api/auth', authRoutes)

app.use(authMiddleware)

app.use("/api", userRoutes)
app.use("/api/devices", machineRoutes)
app.use("/api/csv", csvRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use(errorMiddleware)


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await connectDB()
})