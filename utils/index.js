export function validateUrl (value) {
  // Expresión regular para validar una URL
  const urlRegex = /^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
  return urlRegex.test(value)
}
