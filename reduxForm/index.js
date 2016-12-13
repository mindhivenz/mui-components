var error = require('../dist/reduxForm/error')
var validators = require('../dist/reduxForm/validators')

module.exports = {
  asSubmissionError: error.asSubmissionError,
  join: validators.join,
  createFormValidator: validators.createFormValidator,
  isEmpty: validators.isEmpty,
  words: validators.words,
  alphaNumeric: validators.alphaNumeric,
  email: validators.email,
  required: validators.required,
  requiredIf: validators.requiredIf,
  minLength: validators.minLength,
  maxLength: validators.maxLength,
  integer: validators.integer,
  oneOf: validators.oneOf,
  uniqueName: validators.uniqueName,
  match: validators.match,
  containsUpper: validators.containsUpper,
  containsLower: validators.containsLower,
  containsNumber: validators.containsNumber,
}
