const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect
const { Pact, Matchers } = require("@pact-foundation/pact")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"

chai.use(chaiAsPromised)

describe("Pact", () => {
  const provider = new Pact({
    consumer: "Matching Service",
    provider: "Animal Profile Service",
    // port: 1234, // You can set the port explicitly here or dynamically (see setup() below)
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: LOG_LEVEL,
    spec: 2,
  })

  // Alias flexible matchers for simplicity
  const { eachLike, like, term, iso8601DateTimeWithMillis } = Matchers

  // Setup a Mock Server before unit tests run.
  // This server acts as a Test Double for the real Provider API.
  // We then call addInteraction() for each test to configure the Mock Service
  // to act like the Provider
  // It also sets up expectations for what requests are to come, and will fail
  // if the calls are not seen.
  before(() =>
    provider.setup().then(opts => {
      // Get a dynamic port from the runtime
      process.env.API_HOST = `http://localhost:${opts.port}`
    })
  )

  // After each individual test (one or more interactions)
  // we validate that the correct request came through.
  // This ensures what we _expect_ from the provider, is actually
  // what we've asked for (and is what gets captured in the contract)
  afterEach(() => provider.verify())

  // Configure and import consumer API
  // Note that we update the API endpoint to point at the Mock Service
  const { clientWith302Redirect } = require("../consumer")

  describe("Client", () => {
    describe("Redirects with 302", () => {
      before(() =>
        provider.addInteraction({
          uponReceiving: "a request for all animals",
          withRequest: {
            method: "GET",
            path: "/animals/available",
          },
          willRespondWith: {
            status: 302,
            headers: {
              Location: "http://foo.com",
            },
          },
        })
      )

      it("returns a 302 redirect", async () => {
        const location = await clientWith302Redirect()
        expect(location).to.eq('http://foo.com')
      })
    })
  })

  // Write pact files
  after(() => {
    return provider.finalize()
  })
})
