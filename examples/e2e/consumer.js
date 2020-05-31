const request = require("superagent")

const getApiEndpoint = () => process.env.API_HOST || "http://localhost:8081"

const clientWith302Redirect = () => {
  return request
    .get(`${getApiEndpoint()}/animals/available`)
    .redirects(false)
    .then((res) => res)
    .catch(e => e.response.headers['location'])

}

module.exports = {
  clientWith302Redirect
}
