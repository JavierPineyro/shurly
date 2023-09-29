import { connectDatabase, disconnectDatabase } from '../database/db.js'
import { validateUrl } from '../utils/index.js'
import UrlModelSchema from './UrlModelSchema.js'
import { customAlphabet } from 'nanoid'

// Add a custom alphabet and number of characteres used in nanoID function
const nanoid = customAlphabet('1234567890abcdefghijk', 11)

export class UrlModel {
  static async getById({ id }) {
    try {
      await connectDatabase()
      const url = await UrlModelSchema.findOne({ idURL: id })
      await disconnectDatabase()
      return url
    } catch (error) {
      throw new Error('Error getting a URL by ID in database', error)
    }
  }

  static async increaseClickCounter({ id }) {
    try {
      await connectDatabase()
      await UrlModelSchema.updateOne(
        { idURL: id },
        { $inc: { clicksCount: 1 } } // Mongo function to increment a value
      )
      await disconnectDatabase()
    } catch (error) {
      throw new Error('Error increasing click counter in database', error)
    }
  }

  static async getByUrl({ originalUrl }) {
    try {
      await connectDatabase()
      const url = await UrlModelSchema.findOne({ originalURL: originalUrl })
      await disconnectDatabase()
      return url
    } catch (error) {
      throw new Error('Error getting a URL by URL in database', error)
    }
  }

  static async create({ originalUrl, baseUrl }) {
    const idURL = nanoid()
    const shortURL = `${baseUrl}/${idURL}`

    const newUrl = new UrlModelSchema({
      idURL,
      originalURL: originalUrl,
      shortURL,
      createdAt: new Date()
    })

    try {
      await connectDatabase()
      newUrl.save().then(() => disconnectDatabase())
    } catch (error) {
      throw new Error('Error creating a new URL in database', error)
    }

    return newUrl
  }

  static validate({ originalUrl }) {
    return validateUrl(originalUrl)
  }
}
