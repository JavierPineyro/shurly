import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const username = process.env.DB_USERNAME
const pass = process.env.DB_PASS
const MONGODB_URI = `mongodb+srv://${username}:${pass}@shurly-url.rnzosvh.mongodb.net/shurlydb?retryWrites=true&w=majority`

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database Connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

export default connectDatabase
