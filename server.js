import path from 'node:path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import routerUrl from './routes/urls.js'
import routerRedirect from './routes/index.js'
import unknownEndpoint from './middleware/unknownEndpoint.js'
import { log } from './utils/index.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(helmet())

const apiLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 50, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true // Disable the `X-RateLimit-*` headers
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

// Serve frontend
app.use(express.static(path.resolve(process.cwd(), 'client', 'dist')))

app.set('trust proxy', 1)
app.use('/api', apiLimiter)

app.use('/', routerRedirect)
app.use('/api', routerUrl)

app.use(unknownEndpoint)

// Server Setup
const PORT = process.env.PORT || 0
const BASEURL = process.env.NODE_ENV === 'production'
  ? process.env.BASE
  : `http://localhost:${PORT}`

app.listen(PORT, () => {
  log(`Server running at PORT: ${PORT}`)

  log(`App running at: ${BASEURL}`)
})
