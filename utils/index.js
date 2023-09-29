export function validateUrl (value) {
  // Expresión regular para validar una URL
  const urlRegex = /^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
  return urlRegex.test(value)
}

// a log function that receives args and return a console log with that

export function log (...args) {
  console.log(args)
}

export function logError (...args) {
  console.error(args)
}
