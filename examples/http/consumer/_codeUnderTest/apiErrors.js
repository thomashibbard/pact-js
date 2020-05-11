export const API_ERROR = "API_ERROR"
export const API_NO_RESPONSE = "API_NO_RESPONSE"
export const API_NOT_AUTHORISED = "API_NOT_AUTHORISED"

export class ApiError extends Error {
  constructor(message = "An API error occured", code = API_ERROR, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message, ...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = code
  }
}
