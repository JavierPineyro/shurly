import { UrlModel } from '../models/index.js'
import { logError } from '../utils/index.js'

export class UrlController {
  static async redirect(req, res) {
    const { id } = req.params

    try {
      const url = await UrlModel.getUrlToRedirect({ id })
      if (!url) {
        return res.status(404).send({ message: 'Url does not exists' })
      }

      return res.status(301).redirect(url.originalURL)
    } catch (err) {
      logError('Error redirecting url', err)
      return res.status(500).send({ message: 'Something went wrong while redirecting url' })
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
      return res.status(404).send({ message: 'Invalid url' })
    }

    try {
      const foundUrl = await UrlModel.getByUrl({ originalUrl })

      if (foundUrl) {
        return res.json(foundUrl)
      }

      const url = await UrlModel.create({ originalUrl, baseUrl })
      return res.status(201).json(url)
    } catch (err) {
      console.error('Error creating url', err)
      return res.status(500).send({ message: 'Something went wrong while creating url' })
    }
  }
}
