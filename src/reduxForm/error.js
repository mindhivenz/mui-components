import { SubmissionError } from 'redux-form'


// Copied from @mindhive/meteor (but we don't want to import it)
const VALIDATION_ERROR = 'validation-error'

export const rethrowAsSubmissionError = (promise) =>
  promise.catch(error => {
    const field = (error.error === VALIDATION_ERROR && error.details) || '_error'
    throw new SubmissionError({
      [field]: error.reason,
    })
  })

export const asSubmissionError = (promiseOrCreator) =>
  typeof promiseOrCreator === 'function' ?
    (...args) => rethrowAsSubmissionError(promiseOrCreator(...args))
    : rethrowAsSubmissionError(promiseOrCreator)

