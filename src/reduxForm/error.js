import { SubmissionError } from 'redux-form'


// Copied from @mindhive/meteor (because we don't want to import it just for this)
const VALIDATION_ERROR = 'validation-error'

const REDUX_FORM_GLOBAL_ERROR_KEY = '_error'

const rethrowAsSubmissionError = (e) => {
  if (e.reason) {
    const fieldKey = (e.error === VALIDATION_ERROR && e.details) || REDUX_FORM_GLOBAL_ERROR_KEY
    throw new SubmissionError({
      [fieldKey]: e.reason,
    })
  } else {
    console.error('Unexpected error type from submit', e, e.stack)  // eslint-disable-line no-console
    throw e
  }
}

export const asSubmissionError = (promiseOrCreator) =>
  typeof promiseOrCreator === 'function' ?
    (...args) => {  // eslint-disable-line consistent-return
      try {
        return promiseOrCreator(...args).catch(rethrowAsSubmissionError)
      } catch (e) {
        rethrowAsSubmissionError(e)
      }
    }
    : promiseOrCreator.catch(rethrowAsSubmissionError)

