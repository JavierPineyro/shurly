import { Router } from 'express'
import { UrlController } from '../controllers/url.js'

const routerRedirect = Router()

routerRedirect.get('/:id', UrlController.redirect)

export default routerRedirect
