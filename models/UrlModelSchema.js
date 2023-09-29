import { Schema, model } from 'mongoose'

const UrlSchema = new Schema({
  idURL: {
    require: true,
    type: String
  },
  originalURL: {
    require: true,
    type: String
  },
  shortURL: {
    require: true,
    type: String
  },
  clicksCount: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: String,
    default: Date.now
  }
})

UrlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const UrlModelSchema = model('Url', UrlSchema)

export default UrlModelSchema
