import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
// Database
import connectDB from './config/db.js'

// Error Handler
import { errorHandler } from './middleware/errorMiddlware.js'

// Route imports
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', userRoutes)

app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${port}`.magenta
      .bold
  )
})
