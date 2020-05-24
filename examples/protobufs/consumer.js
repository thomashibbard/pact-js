const { AnimalProto } = require("./proto")
const util = require("util")
const grpc = require("grpc")

const client = new AnimalProto.Matching(
  "localhost:50051",
  grpc.credentials.createInsecure()
)

// Fetch animals who are currently 'available' from the
// Animal Service
const availableAnimals = () => {
  client.animalServicePromise = util.promisify(client.availableAnimals)
  return client.animalServicePromise({}).then(res => {
    return res.animals
  })
}

// Suggestions function:
// Given availability and sex etc. find available suitors,
// and give them a 'score'
const suggestion = mate => {
  const predicates = [
    (candidate, animal) => candidate.id !== animal.id,
    (candidate, animal) => candidate.gender !== animal.gender,
    (candidate, animal) => candidate.animal === animal.animal,
  ]

  const weights = [(candidate, animal) => Math.abs(candidate.age - animal.age)]

  return availableAnimals().then(available => {
    const eligible = available.filter(
      a => !predicates.map(p => p(a, mate)).includes(false)
    )

    return {
      suggestions: eligible.map(candidate => {
        const score = weights.reduce((acc, weight) => {
          return acc - weight(candidate, mate)
        }, 100)

        return {
          score,
          animal: candidate,
        }
      }),
    }
  })
}

module.exports = {
  suggestion,
  availableAnimals,
}
