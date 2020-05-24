const grpc = require("grpc")
const Repository = require("./repository")
const { AnimalProto } = require("./proto")
const animalRepository = new Repository()

// Load default data into a repository
const importData = () => {
  const data = require("./data/animalData.json")
  data.reduce((a, v) => {
    v.id = a + 1
    animalRepository.insert(v)
    return a + 1
  }, 0)
}

// List all animals with 'available' eligibility
const findAvailableAnimals = () =>
  animalRepository.fetchAll().filter(a => a.eligibility.available)

const availableAnimals = (_, callback) => {
  callback(null, { animals: findAvailableAnimals() })
}

const main = () => {
  const server = new grpc.Server()
  server.addService(AnimalProto.Matching.service, {
    availableAnimals,
  })
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure())
  server.start()
}

module.exports = {
  importData,
  animalRepository,
  main,
}
