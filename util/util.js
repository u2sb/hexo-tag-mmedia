exports.clone = (object) => {
  return JSON.parse(JSON.stringify(object))
}

exports.throwError = (message) => {
  throw new Error(`[hexo-tag-aplayer] ${message}`)
}

exports.extractOptionValue = (pair) => {
  return pair.slice(pair.indexOf(':') + 1)
}
