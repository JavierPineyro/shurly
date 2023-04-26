import express from 'express'
import UrlModel from '../models/UrlModel.js'

const routerRedirect = express.Router()

routerRedirect.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const url = await UrlModel.findOne({ idURL: id })

    if (url) {
      await UrlModel.updateOne(
        { idURL: id },
        { $inc: { clicksCount: 1 } } // Mongo function to increment a value
      )
      // Redirect to original url after update click counter
      return res.redirect(url.originalURL)
    }
    // Return not found message if url doesn't exists
    return res.status(404).send({ message: 'Url does not exists' })
  } catch (err) {
    console.error(err)
    // return Internal server error response if DB error
    return res.status(500).send({ message: 'Something went wrong, server error' })
  }
})

export default routerRedirect
