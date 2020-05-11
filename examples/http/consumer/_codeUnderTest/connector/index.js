import axios from "axios"
import { unmarshallSuccess, unmarshallFailure } from "./marshaller"

// This is the connector for axios.
// It knows how to turn logical requests into axios calls

export default (basepath, authToken) => ({
  authedGet: path =>
    axios
      .get(`${baseUrl}${path}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(unmarshallSuccess, unmarshallFailure),
})
