const { suggestion, availableAnimals } = require("./consumer.js")

suggestion({
  id: 2,
  available_from: "2017-12-04T14:47:18.582Z",
  first_name: "Nanny",
  animal: "goat",
  last_name: "Doe",
  age: 27,
  gender: "F",
  location: {
    description: "Werribee Zoo",
    country: "Australia",
    post_code: 3000,
  },
  eligibility: {
    available: true,
    previously_married: true,
  },
  interests: ["walks in the garden/meadow", "parkour"],
})

// availableAnimals()
