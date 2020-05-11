import {
  ApiError,
  API_ERROR,
  API_NO_RESPONSE,
  API_NOT_AUTHORISED,
} from "../errors"

// This module knows how to turn axios responses into
// the relevant response objects or errors

export const unmarshallSuccess = reponse => response.data

export const unmarshallFailure = error => {
  if (error.response) {
    if (error.response.status === 401) {
      throw new ApiError(
        "The server says that you're not authorised.",
        API_NOT_AUTHORISED
      )
    }

    throw new ApiError(
      (error.response.data && error.response.data.message
        ? error.response.data.message
        : "The server returned an error code") + error.response.status,
      API_ERROR
    )
  }
  if (error.request) {
    throw new ApiError("The server didn't respond", API_NO_RESPONSE)
  }
}
