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
      return url
    } catch (error) {
      throw new Error('Error getting a URL by ID in database', error)
    } finally {
      await disconnectDatabase()
    }
  }

  static async increaseClickCounter({ id }) {
    try {
      await connectDatabase()
      await UrlModelSchema.updateOne(
        { idURL: id },
        { $inc: { clicksCount: 1 } } // Mongo function to increment a value
      )
    } catch (error) {
      throw new Error('Error increasing click counter in database', error)
    } finally {
      await disconnectDatabase()
    }
  }

  static async getUrlToRedirect({ id }) {
    try {
      await connectDatabase()
      const url = await UrlModelSchema.findOne({ idURL: id })

      if (url != null) {
        await UrlModel.increaseClickCounter({ id })
      }
      return url
    } catch (error) {
      throw new Error('Error in Model getting URL to redirect', error)
    } finally {
      await disconnectDatabase()
    }
  }

  static async getByUrl({ originalUrl }) {
    try {
      await connectDatabase()
      const url = await UrlModelSchema.findOne({ originalURL: originalUrl })
      return url
    } catch (error) {
      throw new Error('Error getting a URL by URL in database', error)
    } finally {
      await disconnectDatabase()
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
      await newUrl.save()
    } catch (error) {
      throw new Error('Error creating a new URL in database', error)
    } finally {
      await disconnectDatabase()
    }

    return newUrl
  }

  static validate({ originalUrl }) {
    return validateUrl(originalUrl)
  }
}
