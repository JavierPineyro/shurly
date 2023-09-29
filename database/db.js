import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { log, logError } from '../utils/index.js'
dotenv.config()

const username = process.env.DB_USERNAME
const pass = process.env.DB_PASS
const MONGODB_URI = `mongodb+srv://${username}:${pass}@shurly-url.rnzosvh.mongodb.net/shurlydb?retryWrites=true&w=majority`

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    log('Database Connected')
  } catch (err) {
    console.error(err.message)
    logError('Database problems during connection, back to work')
    await mongoose.disconnect()
  }
}

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close()
    log('Database disconnected')
  } catch (err) {
    console.error(err.message)
    logError('Database problems during disconnection, back to work')
    await mongoose.disconnect()
  }
}
