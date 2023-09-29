import { UrlModel } from '../models/index.js'
import { logError } from '../utils/index.js'

export class UrlController {
  static async redirect(req, res) {
    const { id } = req.params

    try {
      const url = await UrlModel.getById({ id })

      if (!url) {
        return res.status(404).send({ message: 'Url does not exists' })
      }

      await UrlModel.increaseClickCounter({ id })
      return res.redirect(url.originalURL)
    } catch (err) {
      logError(err)
      return res.status(500).send({ message: 'Something went wrong, server error' })
    }
  }

  static async create(req, res) {
    const { originalUrl } = req.body
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE : 'http://localhost:8080'
    const isValidUrl = UrlModel.validate({ originalUrl })
    const isAlreadyShorted = originalUrl?.includes(baseUrl)

    if (isAlreadyShorted) {
      return res.status(400).send({ message: 'Url was already shorted' })
    }

    if (!isValidUrl) {
    // return Invalid url error if it's not a valid url
      return res.status(404).send({ message: 'Invalid url' })
    }

    try {
      const foundUrl = await UrlModel.getByUrl({ originalUrl })

      if (foundUrl) {
        return res.json(foundUrl)
      }

      const url = await UrlModel.create({ originalUrl, baseUrl })
      return res.json(url)
    } catch (err) {
      console.error(err)
      return res.status(500).send({ message: 'Something went wrong, server error' })
    }
  }
}