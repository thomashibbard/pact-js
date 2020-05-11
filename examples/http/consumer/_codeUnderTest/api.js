import connector from "./connector"

// This is the main API interface. It knows how to turn your business domain
// requests into logical requests for the connector. The connector's job is to
// turn the logical requests into actual requests.

const api = (baseurl, authToken) => {
  const server = connector(baseurl, authToken)

  return {
    getAllProducts: () => server.authedGet("/products"),
    getProduct: id => server.authedGet(`/products/${id}`),
  }
}

export default api
