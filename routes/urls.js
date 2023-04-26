import express from 'express'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { validateUrl } from '../utils/index.js'
import UrlModel from '../models/UrlModel.js'

dotenv.config()
const routerUrl = express.Router()

routerUrl.post('/short', async (req, res) => {
  const { originalUrl } = req.body
  const baseUrl = process.env.BASE
  const isValidUrl = validateUrl(originalUrl)
  const isAlreadyShorted = originalUrl?.includes(baseUrl)

  if (isAlreadyShorted) {
    return res.status(400).send({ message: 'Url was already shorted' })
  }

  if (isValidUrl) {
    try {
      let url = await UrlModel.findOne({ originalURL: originalUrl })

      if (url) {
        // return url if already exits
        return res.json(url)
      }
      const idURL = nanoid()
      const shortURL = `${baseUrl}/${idURL}`

      url = new UrlModel({
        idURL,
        originalURL: originalUrl,
        shortURL,
        createdAt: new Date()
      })
      await url.save()
      // return created url after save it
      return res.json(url)
    } catch (err) {
      console.error(err)
      // return Internal server error response if DB error
      return res.status(500).send({ message: 'Something went wrong, server error' })
    }
  }
  // return Invalid url error if it's not a valid url
  return res.status(404).send({ message: 'Invalid url' })
})

export default routerUrl
