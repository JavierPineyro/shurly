import { Router } from 'express'
import dotenv from 'dotenv'

import { UrlController } from '../controllers/url.js'

dotenv.config()
const routerUrl = Router()

routerUrl.post('/short', UrlController.create)

export default routerUrl
