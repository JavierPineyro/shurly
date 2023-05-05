import path from 'node:path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDatabase from './db.js'
import routerUrl from './routes/urls.js'
import routerRedirect from './routes/index.js'
import unknownEndpoint from './middleware/unknownEndpoint.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(helmet())

connectDatabase()

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true // Disable the `X-RateLimit-*` headers
})

app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(process.cwd(), '/client/dist'))) // Serve frontend
app.set('trust proxy', 1)
app.use('/api', apiLimiter) // Apply the rate limiting middleware to API calls only

app.use('/', routerRedirect)
app.use('/api', routerUrl)

app.use(unknownEndpoint)
// Add a error middleware in the future to handle errors
// app.use(errorHandler)

// Server Setup
const PORT = process.env.PORT || 3333
const BASEURL = process.env.BASE

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`)

  console.log(`App running at: ${BASEURL}`)
})
