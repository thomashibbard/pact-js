const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Repository = require("./repository")

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})


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

// Get all available animals
server.get("/animals/available", (req, res) => {
  res.redirect(302, "http://foo.com")
})


module.exports = {
  server,
  importData,
  animalRepository,
}
